import React, { useState } from "react";
import { useDashboardContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

function MemberDetails() {
  const { MemberInfo } = useDashboardContext();

  console.log(MemberInfo)

  const Navigate = useNavigate();

  const [SelectedUser, setSelectedUser] = useState();

  const handleClick = (member) => {
    console.log(member)
    setSelectedUser(member); // optional if you just want ID
    Navigate("/api/viewmemberdetails", { state: { SelectedUser: member } });
  };

 

  return (
    <div className="py-6  md:p-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Members Details</h2>
        <button
        onClick={()=> Navigate("/api/addmember")}
         className="mt-3 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          + Add Member
        </button>
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Admission Date</th>
              <th className="px-6 py-3">Expire Date</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {MemberInfo?.members?.length > 0 ? (
              MemberInfo.members.map((member) => {
                // Plan ka last expire date nikalna
                const lastExpireDate =
                  member.plan && member.plan.length > 0
                    ? new Date(
                        member.plan[member.plan.length - 1].expireDate
                      ).toLocaleDateString()
                    : "N/A";

                return (
                  <tr
                    key={member._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={
                          member.livePhoto || "https://via.placeholder.com/50"
                        }
                        alt={member.fullName}
                        className="w-12 h-12 rounded-full border shadow-sm object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{member.fullName}</td>
                    <td className="px-6 py-4">
                      {new Date(member.admissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{lastExpireDate}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          handleClick(member);
                        }}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-lg shadow hover:bg-green-700 transition"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No Members Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberDetails;
