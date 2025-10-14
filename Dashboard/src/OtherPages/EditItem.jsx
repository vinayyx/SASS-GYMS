import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDashboardContext } from "../Context/Context";
import { useNavigate, useLocation } from "react-router-dom";

function EditItem() {
  const { refreshCanteen } = useDashboardContext();
  const navigate = useNavigate();
  const location = useLocation();
  const itemId = location.state?.id; // id passed from handleEdit

  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: "",
    itemDescription: "",
    category: "",
    isAvailable: true,
    itemImage: null,
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing item data
  useEffect(() => {
    if (!itemId) return;

    const fetchItem = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/canteen/getitembyid/${itemId}`);
        if (res.data.success) {
          const item = res.data.data;
          setFormData({
            itemName: item.itemName || "",
            itemPrice: item.itemPrice || "",
            itemDescription: item.itemDescription || "",
            category: item.category || "",
            isAvailable: item.isAvailable ?? true,
            itemImage: null,
          });
        } else {
          toast.error("Failed to fetch item details");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching item");
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.itemName || !formData.itemPrice || !formData.category) {
      return toast.error("Please fill all required fields!");
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("itemName", formData.itemName);
      data.append("itemPrice", formData.itemPrice);
      data.append("itemDescription", formData.itemDescription);
      data.append("category", formData.category);
      data.append("isAvailable", formData.isAvailable ? "true" : "false"); // Boolean as string
      if (formData.itemImage) data.append("itemImage", formData.itemImage);

      // Debug log
      console.log("Updating Item ID:", itemId);
      for (let pair of data.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/canteen/update/${itemId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        refreshCanteen();
        navigate("/api/totalitem");
      } else {
        toast.error(res.data.message || "Failed to update item");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Item Name*</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price*</label>
          <input
            type="number"
            name="itemPrice"
            value={formData.itemPrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category*</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label className="font-medium">Available</label>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            name="itemImage"
            onChange={handleChange}
            accept="image/*"
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Item"}
        </button>
      </form>
    </div>
  );
}

export default EditItem;
