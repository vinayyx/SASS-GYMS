import React from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useDashboardContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function TotalItems() {
  const { getTotalItem, refreshCanteen } = useDashboardContext();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    
    navigate("/edititem", { state: { id } });
  };

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/canteen/delete/${id}`
      );

      refreshCanteen();

      if (!data) {
        toast.error("Delete Faild");
      } else {
        toast.success("succesfully Item Delted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNew = () => {
    navigate("/additem");
  };

  return (
    <div className="w-full md:p-6 py-6 min-h-[80vh]">
      {/* Add New Item Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={20} /> Add New Item
        </button>
      </div>

      {/* Items Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
        <table className="w-full text-left table-auto min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Item Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getTotalItem && getTotalItem.length > 0 ? (
              getTotalItem.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">
                    <img
                      src={item.itemImage || "/placeholder.png"}
                      alt={item.itemName || "Item Image"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium">
                    {item.itemName || "-"}
                  </td>
                  <td className="px-6 py-3">
                    {item.itemPrice ? `₹${item.itemPrice}` : "-"}
                  </td>
                  <td className="px-6 py-3">
                    {item.isAvailable ? "Available" : "Not Available"}
                  </td>
                  <td className="px-6 py-3 flex justify-center items-center gap-4">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
                      aria-label={`Edit ${item.itemName}`}
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800 flex items-center justify-center"
                      aria-label={`Delete ${item.itemName}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TotalItems;
