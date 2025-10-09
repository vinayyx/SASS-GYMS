import React from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

function Hero() {
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      formData.append("access_key", "ef1b7879-bab3-48ba-be03-09ca0487fd3e");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank You for contacting");
        event.target.reset();
      } else {
        toast.error("Error", data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center md:px-16 px-6 bg-black py-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10 h-auto md:h-[90%]">
        {/* Left Form Section */}
        <div className="w-full md:w-[50%] flex flex-col justify-center items-center rounded-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 mb-6 text-center md:text-left">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-white">
              Contact Us
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              It is a long established fact that a reader will be distracted by
              readable content.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center md:items-start w-full gap-6"
          >
            <div className="w-full sm:w-[90%] md:w-[80%] border-b border-gray-400">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full bg-transparent outline-none text-red-700 py-2 placeholder-gray-400"
              />
            </div>

            <div className="w-full sm:w-[90%] md:w-[80%] border-b border-gray-400">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full bg-transparent outline-none text-red-700 py-2 placeholder-gray-400"
              />
            </div>

            <div className="w-full sm:w-[90%] md:w-[80%] border-b border-gray-400">
              <input
                type="text"
                name="message"
                placeholder="Your Message"
                className="w-full bg-transparent outline-none text-red-700 py-2 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full sm:w-[90%] md:w-[80%] bg-red-700 text-black font-bold py-3 rounded-full transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Info Section */}
        <div className="w-full md:w-[50%] flex justify-center items-center   md:p-5">
          <div className="w-full  rounded-3xl bg-[#18191B] p-6 sm:p-8 flex flex-col gap-8 sm:gap-12 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left">
              Information
            </h1>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-sm sm:text-base">
              {/* Opening Hour */}
              <div>
                <div className="flex items-center gap-2 font-semibold text-red-700">
                  <Clock size={18} /> Opening Hour
                </div>
                <p className="mt-2">Monday - saturday</p>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 font-semibold text-red-700">
                  <Mail size={18} /> Email
                </div>
                <p className="mt-2">fitandmore@gmail.com</p>
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-2 font-semibold text-red-700">
                  <MapPin size={18} /> Address
                </div>
                <p className="mt-2">
                  39, opp. smriti talkies, opp. bajarya masjid, choraya, Imli
                  Bazar, Indore, Madhya Pradesh 452006
                </p>
              </div>

              {/* Phone Numbers */}
              <div>
                <div className="flex items-center gap-2 font-semibold text-red-700">
                  <Phone size={18} /> Phone Numbers
                </div>
                <p className="mt-2">08383947416</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
