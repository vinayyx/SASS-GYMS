import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      // Example POST (You can replace with your actual backend endpoint)
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Get in Touch with <span className="text-purple-500">FitMore Team</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Have any questions or inquiries about FitMore Gym Management?  
            We'd love to hear from you. Our team is available to assist you with setup, technical issues, and feature details.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-purple-400" />
              <span>xyntechinfo@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-purple-400" />
              <span>+91 7225885892</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-purple-400" />
              <span>Indore, Madhya Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] rounded-2xl p-8 shadow-lg border border-gray-700"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Send Us a Message</h3>
          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-purple-600 font-semibold hover:bg-purple-700 transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            For urgent inquiries, reach us at{" "}
            <span className="text-purple-400">support@fitmore.in</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
