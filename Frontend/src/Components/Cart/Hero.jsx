// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Hero() {
  const CART_KEY = "canteen_cart";
  const [cartItems, setCartItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [personName, setPersonName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // Fetch all items to get their details
  const fetchAllItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/canteen/getall`
      );
      if (res.data?.success) {
        setAllItems(res.data.data || []);
      } else {
        toast.error("Failed to fetch items");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Load cart from localStorage
  const loadCart = () => {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return setCartItems([]);
    try {
      const cart = JSON.parse(raw);
      setCartItems(cart);
    } catch {
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchAllItems();
    loadCart();
  }, []);

  const getItemDetails = (id) => allItems.find((i) => i._id === id);

  const increaseQty = (id) => {
    const updated = cartItems.map((c) =>
      c.id === id ? { ...c, qty: (c.qty || 0) + 1 } : c
    );
    setCartItems(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((c) =>
        c.id === id ? { ...c, qty: Math.max(1, (c.qty || 0) - 1) } : c
      )
      .filter((c) => c.qty > 0);
    setCartItems(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((c) => c.id !== id);
    setCartItems(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((acc, c) => {
    const item = getItemDetails(c.id);
    return acc + (item?.itemPrice || 0) * (c.qty || 0);
  }, 0);

const handlePlaceOrder = async () => {
  if (!personName || !phoneNumber) {
    return toast.error("Please enter name and phone number");
  }

  if (cartItems.length === 0) {
    return toast.error("Cart is empty");
  }

  try {
    // Build items array with duplicates according to quantity
    const itemsArray = cartItems.flatMap((c) =>
      Array(c.qty).fill(c.id)
    );

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/create`,
      {
        personName,
        phoneNumber,
        items: itemsArray,
      }
    );

    if (res.data?.success) {
      toast.success("Order placed successfully!");
      localStorage.removeItem(CART_KEY);
      setCartItems([]);
      setPersonName("");
      setPhoneNumber("");
      navigate("/");
    } else {
      toast.error("Failed to place order");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong while placing order");
  }
};


  if (loading) {
    return <div className="text-center py-20 text-white">Loading cart...</div>;
  }

  return (
    <section className="min-h-screen bg-black text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((c) => {
              const item = getItemDetails(c.id);
              if (!item) return null;
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between bg-[#222222] rounded-xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.itemImage || "/placeholder.png"}
                      alt={item.itemName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.itemName}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {item.itemDescription || "No description"}
                      </p>
                      <div className="mt-2 text-red-400 font-bold">
                        ₹{item.itemPrice * c.qty}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(c.id)}
                        className="px-2 py-1 bg-red-700 rounded hover:bg-red-800 transition"
                      >
                        -
                      </button>
                      <span>{c.qty}</span>
                      <button
                        onClick={() => increaseQty(c.id)}
                        className="px-2 py-1 bg-red-700 rounded hover:bg-red-800 transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(c.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Total & Order Form */}
            <div className="bg-[#222222] rounded-xl p-6 space-y-4">
              <div className="text-right text-xl font-bold text-red-400">
                Total: ₹{totalPrice}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-black border border-red-700 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-black border border-red-700 focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
