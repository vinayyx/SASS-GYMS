// ViewAllPlan.jsx
import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../Context/Context";
import { Calendar, DollarSign, Tag, List, Pencil, Trash2 } from "lucide-react";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import axios from "axios";

const ViewAllPlan = () => {
  const { getAllPlan , refreshPlan} = useDashboardContext();

  const Navigate = useNavigate()

 


  const handleEdit = (id) => {
    console.log("Edit plan:", id);
    Navigate("/editPlan", { state: { SelectedUser: id } });
  };

  const handleDelete = async (id) => {

        try {
      
      const data = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/plan/delete-plan-by-id/${id}`)

      if(data){
        toast.success("blog is successfully delted")
        refreshPlan()

      }
    } catch (error) {

      console.log(error)
      
    }
   
  };

  return (
    <div className="py-6  md:p-6  h-[80vh] ">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Membership Plans
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 text-sm">
              <th className="p-4">#</th>
              <th className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} /> Price
                </div>
              </th>
              <th className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Duration
                </div>
              </th>
              <th className="p-4">
                <div className="flex items-center gap-2">
                  <Tag size={16} /> Type
                </div>
              </th>
              <th className="p-4">
                <div className="flex items-center gap-2">
                  <List size={16} /> Key Points
                </div>
              </th>
              <th className="p-4">Created At</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {getAllPlan.length > 0 ? (
              getAllPlan.map((plan, index) => (
                <tr
                  key={plan._id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-semibold text-blue-600">
                    ₹{plan.price}
                  </td>
                  <td className="p-4">{plan.duration}</td>
                  <td className="p-4">{plan.type}</td>
                  <td className="p-4">
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {plan.keyPoints?.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(plan.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    <br />
                    {new Date(plan.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(plan._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500 italic"
                >
                  No plans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllPlan;
