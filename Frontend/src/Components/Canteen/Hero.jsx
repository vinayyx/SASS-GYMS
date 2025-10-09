// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Key used in localStorage
  const CART_KEY = "canteen_cart";

  useEffect(() => {
    fetchItems();
    syncCartCount();
    // eslint-disable-next-line
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/canteen/getall`
      );
      if (res.data?.success) {
        setItems(res.data.data || []);
      } else {
        setError("Failed to fetch items");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching items");
    } finally {
      setLoading(false);
    }
  };

  const syncCartCount = () => {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) {
      setCartCount(0);
      return;
    }
    try {
      const cart = JSON.parse(raw);
      // cart is array of { id, qty } objects
      const totalQty = cart.reduce((acc, it) => acc + (it.qty || 0), 0);
      setCartCount(totalQty);
    } catch {
      setCartCount(0);
    }
  };

  const addToCart = (itemId) => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      let cart = [];
      if (raw) {
        cart = JSON.parse(raw);
      }

      // find existing
      const idx = cart.findIndex((c) => c.id === itemId);
      if (idx === -1) {
        cart.push({ id: itemId, qty: 1 });
      } else {
        cart[idx].qty = (cart[idx].qty || 0) + 1;
      }

      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      syncCartCount();
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Could not add to cart");
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <section className="w-full min-h-screen  text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Canteen Menu
            </h1>
            <p className="text-sm text-gray-300 mt-1 max-w-xl">
              Fresh items, quick service. Tap "Add to cart" for items you want to
              order. Open Cart to place your order.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToCart}
              className="relative inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition"
            >
              <span className="font-medium">Go to Cart</span>
              <span className="inline-flex items-center justify-center w-6 h-6 text-sm rounded-full bg-black text-red-300">
                {cartCount}
              </span>
            </button>
          </div>
        </header>

        {/* Items Grid */}
        <div>
          {loading ? (
            <div className="text-center py-20">Loading items...</div>
          ) : error ? (
            <div className="text-center text-red-300 py-6">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center text-gray-300 py-6">No items found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <article
                  key={item._id}
                  className="bg-black/60 border border-red-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition"
                >
                  <div className="h-44 md:h-52 w-full bg-red-900/20 flex items-center justify-center">
                    <img
                      src={item.itemImage || "/placeholder.png"}
                      alt={item.itemName}
                      className="object-cover w-full h-full"
                      style={{ maxHeight: 220 }}
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{item.itemName}</h3>
                        <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                          {item.itemDescription || "No description"}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold">₹{item.itemPrice}</div>
                        <div className={`mt-2 text-xs font-medium rounded px-2 py-1 ${item.isAvailable ? "bg-green-800 text-green-200" : "bg-gray-700 text-gray-300"}`}>
                          {item.isAvailable ? "Available" : "Not available"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => addToCart(item._id)}
                        disabled={!item.isAvailable}
                        className={`flex-1 text-sm font-medium px-4 py-2 rounded-lg transition ${item.isAvailable ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 cursor-not-allowed"}`}
                      >
                        Add to cart
                      </button>

                      <button
                        onClick={() => {
                          // quick "order now" = add once and go to cart
                          addToCart(item._id);
                          navigate("/cart");
                        }}
                        className="text-sm px-3 py-2 border border-red-600 rounded-lg hover:bg-red-800 transition"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer / small note */}
        <footer className="mt-10 text-sm text-gray-400">
          Tip: Cart is saved in your browser. Go to <span className="text-white">/cart</span> to review & place
          order.
        </footer>
      </div>
    </section>
  );
}

export default Hero;
