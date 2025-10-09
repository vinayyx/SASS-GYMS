import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // ✅ spinner


function Hero() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false); // ✅ submit loader

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
    admissionDate: new Date().toISOString().split("T")[0], // ✅ today's date
    occupation: "",
    medicalHistory: "",
    bloodGroup: "",
    referral: "",
    livePhoto: null,
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // validation
    if (name === "contactNumber" && value.length > 10) return;
    if (name === "alternativeNumber" && value.length > 10) return;
    if (name === "aadhaarNumber" && value.length > 12) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Dropdown Plan Data
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
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/plansDropdown`
      );

      setplanTypes(data.data);

      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchPlanTypes();
  }, []);

  //const planTypes = ["Cardio", "Weight Training"];
  const durations = ["1 Month", "3 Months", "6 Months", "12 Months"];

  const handlePlanChange = (e) => {
    setplanData({ ...planData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (planData.planType && planData.planDuration) {
      dropDownApi(planData.planType, planData.planDuration);
    }
  }, [planData.planType, planData.planDuration]);

  // Plan API
  const dropDownApi = async (type, duration, startDate) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/plan/get-Start-end-Date?type=${encodeURIComponent(
          type
        )}&duration=${encodeURIComponent(duration)}${
          startDate ? `&startDate=${startDate}` : ""
        }`
      );

      if (response.data.success) {
        // Convert DD-MM-YYYY → YYYY-MM-DD
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
          price: response.data.price, // ✅ price fix
        }));

        // price ko formData.amount me bhi update kar do
        setFormData((prev) => ({ ...prev, amount: response.data.price }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // send OTP
  const sendOtp = async () => {
    if (!formData.email) return alert("Enter email first");
    setLoadingOtp(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/send-otp`,
        {
          email: formData.email,
          fullName: formData.fullName,
        }
      );
      setOtpSent(true);
      toast.success("OTP sent!");
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
    setLoadingOtp(false);
  };

  // verify OTP
  const verifyOtp = async () => {
    if (otp.length !== 6) return alert("Enter 6-digit OTP");
    setLoadingOtp(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/verify-otp`,
        { email: formData.email, otp }
      );
      if (res.data.success) {
        setOtpVerified(true);
        toast.success("Email verified!");
      } else toast.error("Invalid OTP");
    } catch (err) {
      console.error(err);
      toast.error("Failed to verify OTP");
    }
    setLoadingOtp(false);
  };

  // 🟢 Razorpay payment
  const handlePayment = async () => {
 setSubmitting(true);

    if (!planData.price) return toast.error("Select plan first");

    /*  if (formData.paymentMethod === "Cash") {
      // Create cash request instead of direct renewal
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cash/create`,
          {
            Name: formData.fullName,
            planName: planData.planName,
            plantype: planData.planType,
            price: planData.price,
            startedDate: planData.startedDate,
            expireDate: planData.expireDate,
            email : formData.email, 
            contact : formData.contactNumber,
            duration: planData.planDuration
      
          }
        );
        if (res.data.success) toast.success("Cash request sent to admin!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to send cash request");
      }
      return;
    }  */

    if (!otpVerified) return alert("Please verify email first");
    if (!planData.price) return alert("Please select a plan first");

    // Cash payment
    if (formData.paymentMethod === "Cash") {
      await handleSubmit(null);
      return;
    }

    try {
      // 1. Create order on backend (₹4500 → 450000 paise)
      const orderRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/order`,
        { amount: planData.price * 100 } // ✅ paise me bhejna
      );

      const { id: order_id, currency, amount } = orderRes.data;

      // 2. Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Gym Membership",
        description: "Plan Payment",
        order_id,
        handler: async function (response) {
          await handleSubmit(response);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.contactNumber,
        },
        theme: { color: "#DC2626" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed to initialize");
    }

     setSubmitting(false);
  };

  // 🟢 Submit Form (after payment)
  const handleSubmit = async (paymentResponse) => {
    setSubmitting(true);
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "livePhoto") return;
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      // ✅ Plan Data
      data.append("planType", planData.planType);
      data.append("planDuration", planData.planDuration);
      data.append("startedDate", planData.startedDate);
      data.append("expireDate", planData.expireDate);
      data.append("paidAmount", planData.price || 0);

      // ✅ Payment Fields (direct, no nested object)
      data.append("method", formData.paymentMethod);
      data.append("transactionId", formData.transactionId || "NA");
      data.append(
        "razorpayOrderId",
        paymentResponse?.razorpay_order_id || "Cash"
      );
      data.append(
        "razorpayPaymentId",
        paymentResponse?.razorpay_payment_id || "Cash"
      );
      data.append(
        "razorpaySignature",
        paymentResponse?.razorpay_signature || "Cash"
      );

      // ✅ Live Photo
      if (formData.livePhoto) {
        data.append("livePhoto", formData.livePhoto);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/create-member`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) toast.success("Member created!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Error creating member");
    }

    setSubmitting(false);

    
  };

  return (
    <div className="w-full min-h-screen py-6 md:px-8 px-2 sm:p-8 bg-black text-white flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePayment();
        }}
        className="w-full max-w-5xl bg-[#222222] p-6 sm:p-8 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Father's Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            required
            value={formData.fatherName}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">City</label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-semibold">Address</label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Live Photo */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2">Live Photo</label>

          {/* hidden input */}
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

          {/* custom button */}
          <label
            htmlFor="livePhotoInput"
            className="cursor-pointer px-4 py-2 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition w-fit"
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
          <label className="text-sm font-semibold">Contact Number</label>
          <input
            type="number"
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
          {formData.contactNumber.length > 0 &&
            formData.contactNumber.length !== 10 && (
              <span className="text-red-500 text-sm">
                Please enter a vaild phone number
              </span>
            )}
        </div>

        {/* Alternative Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Alternative Number</label>
          <input
            type="number"
            name="alternativeNumber"
            value={formData.alternativeNumber}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Aadhaar Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Aadhaar Number</label>
          <input
            type="number"
            name="aadhaarNumber"
            required
            value={formData.aadhaarNumber}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
          {formData.aadhaarNumber.length > 0 &&
            formData.aadhaarNumber.length !== 12 && (
              <span className="text-red-500 text-sm">
                Aadhaar number must be 12 digits
              </span>
            )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Plan Section */}
        <div className="flex flex-col gap-4 sm:col-span-2">
          <label>Plan Type</label>
          <select
            name="planType"
            value={planData.planType}
            onChange={handlePlanChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          >
            <option value="">Select Type</option>
            {planTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label>Duration</label>
          <select
            name="planDuration"
            value={planData.planDuration}
            onChange={handlePlanChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
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
              className="p-3 rounded bg-[#111] border border-gray-600"
            />
            <input
              type="date"
              name="expireDate"
              value={planData.expireDate}
              onChange={handlePlanChange}
              className="p-3 rounded bg-[#111] border border-gray-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Plan Price</label>
            <input
              type="number"
              name="amount"
              value={planData.price || ""}
              readOnly
              className="p-3 rounded bg-[#111] border border-gray-600"
            />
          </div>
        </div>

        {/* Occupation */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Blood Group */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
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
          <label className="text-sm font-semibold">Referral</label>
          <input
            type="text"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Medical History */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-semibold">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          />
        </div>

        {/* Payment Details */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-semibold">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="p-3 rounded bg-[#111] border border-gray-600"
          >
            <option value="">Select Method</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        {/* OTP Section */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-semibold">Email (OTP Verify)</label>
          <div className="flex w-full gap-2">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={otpVerified}
              className="py-3 px-1 flex-1 w-[70%] rounded bg-[#111] border border-gray-600"
            />
            {!otpSent && !otpVerified && (
              <button
                type="button"
                onClick={sendOtp}
                disabled={loadingOtp}
                className="bg-red-700 w-[30%] text-sm px-2 py-2 rounded flex items-center justify-center"
              >
                {loadingOtp ? (
                  <ClipLoader color="#fff" size={16} />
                ) : (
                  "Send OTP"
                )}
              </button>
            )}
            {otpSent && !otpVerified && (
              <button
                type="button"
                onClick={verifyOtp}
                disabled={loadingOtp}
                className="bg-green-700 text-sm px-2 py-2 w-[30%] rounded flex items-center justify-center"
              >
                {loadingOtp ? (
                  <ClipLoader color="#fff" size={16} />
                ) : (
                  "Verify OTP"
                )}
              </button>
            )}
          </div>
          {otpSent && !otpVerified && (
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-3 w-[70%] mt-2 rounded bg-[#111] border border-gray-600"
            />
          )}
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded transition duration-300 flex justify-center items-center"
          >
            {submitting ? <ClipLoader color="#fff" size={20} /> : "Pay & Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Hero;
