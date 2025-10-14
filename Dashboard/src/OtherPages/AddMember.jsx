import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddMember() {
  const token = localStorage.getItem("adminToken"); // get token from localStorage

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    city: "",
    address: "",
    contactNumber: "",
    alternativeNumber: "",
    email: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    gender: "",
    admissionDate: new Date().toISOString().split("T")[0],
    occupation: "",
    medicalHistory: "",
    bloodGroup: "",
    referral: "",
    livePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [planData, setplanData] = useState({
    planType: "",
    planDuration: "",
    planName: "",
    startedDate: "",
    expireDate: "",
    price: "",
  });

  const [planTypes, setplanTypes] = useState([]);

  const fatchPlanTypes = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/plansDropdown`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token in Authorization header
          },
        }
      );

      setplanTypes(data.data.data);

      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchPlanTypes();
  }, []);
  const durations = ["1 Month", "3 Months", "6 Months", "12 Months"];

  const handlePlanChange = (e) => {
    setplanData({ ...planData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (planData.planType && planData.planDuration) {
      dropDownApi(planData.planType, planData.planDuration);
    }
  }, [planData.planType, planData.planDuration]);

  const dropDownApi = async (type, duration, startDate) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/plan/get-Start-end-Date?type=${encodeURIComponent(
          type
        )}&duration=${encodeURIComponent(duration)}${
          startDate ? `&startDate=${startDate}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token in Authorization header
          },
        }
      );

      if (response.data.success) {
        const startParts = response.data.startDate.split("-");
        const endParts = response.data.endDate.split("-");

        const startISO = `${startParts[2]}-${startParts[1]}-${startParts[0]}`;
        const endISO = `${endParts[2]}-${endParts[1]}-${endParts[0]}`;

        setplanData((prev) => ({
          ...prev,
          startedDate: startISO,
          expireDate: endISO,
          planType: response.data.type,
          planDuration: response.data.duration,
          price: response.data.price,
        }));

        setFormData((prev) => ({ ...prev, amount: response.data.price }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "livePhoto") return;
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      data.append("planType", planData.planType);
      data.append("planDuration", planData.planDuration);
      data.append("startedDate", planData.startedDate);
      data.append("expireDate", planData.expireDate);
      data.append("paidAmount", planData.price || 0);

      data.append("method", formData.paymentMethod);
      data.append("transactionId", formData.transactionId || "NA");
      if (formData.livePhoto) {
        data.append("livePhoto", formData.livePhoto);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/create-member`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // this is enough
          },
        }
      );

      if (res.data.success) toast.success("Member created!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Error creating member");
    }
  };

  return (
    <div className=" py-6  md:p-6  h-[80vh] sm:px-8 ">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
               bg-gradient-to-r from-blue-600 to-indigo-600 
               text-transparent bg-clip-text 
               tracking-wide drop-shadow-sm 
               border-b border-blue-600 pb-2 mb-6"
      >
        Add Member
      </h1>

      <div className="w-full    flex justify-center items-start">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full   p-6 sm:p-8 rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Father's Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Father's Name
            </label>
            <input
              type="text"
              name="fatherName"
              required
              value={formData.fatherName}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">City</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Live Photo */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Live Photo
            </label>
            <input
              id="livePhotoInput"
              type="file"
              accept="image/*"
              capture="user"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData((prev) => ({ ...prev, livePhoto: file }));
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="livePhotoInput"
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition w-fit"
            >
              Open Camera
            </label>
            {formData.livePhoto && (
              <span className="text-green-600 mt-2 text-sm">
                Photo selected: {formData.livePhoto.name}
              </span>
            )}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Contact Number
            </label>
            <input
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Alternative Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Alternative Number
            </label>
            <input
              type="number"
              name="alternativeNumber"
              value={formData.alternativeNumber}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Aadhaar Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Aadhaar Number
            </label>
            <input
              type="number"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Plan Section */}
          <div className="flex flex-col gap-4 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Plan Type
            </label>
            <select
              name="planType"
              value={planData.planType}
              onChange={handlePlanChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              {planTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label className="text-sm font-semibold text-gray-700">
              Duration
            </label>
            <select
              name="planDuration"
              value={planData.planDuration}
              onChange={handlePlanChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Duration</option>
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>

            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="date"
                name="startedDate"
                value={planData.startedDate}
                onChange={handlePlanChange}
                className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="expireDate"
                value={planData.expireDate}
                onChange={handlePlanChange}
                className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Plan Price
              </label>
              <input
                type="number"
                name="amount"
                value={planData.price || ""}
                onChange={handlePlanChange}
                className="p-3 rounded border border-gray-300 bg-gray-100"
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          {/* Referral */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Referral
            </label>
            <input
              type="text"
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Medical History */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Payment Details */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Method</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
            >
              Pay & Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
