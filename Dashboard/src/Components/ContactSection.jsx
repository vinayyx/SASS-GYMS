import React from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

function ContactSection() {
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
        toast.success("Thank you for reaching out!");
        event.target.reset();
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center bg-black px-4 sm:px-8 md:px-16 pt-28 pb-16">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10 h-auto md:h-[90%]">
        {/* Left Form Section */}
        <div className="w-full md:w-[50%] flex flex-col justify-center items-center rounded-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 mb-6 text-center md:text-left">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-white">
              Get in Touch
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Have questions or want to work with us? Fill out the form below —
              we’ll get back to you soon.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center md:items-start w-full gap-6"
          >
            <div className="w-full sm:w-[90%] md:w-[80%] border-b border-gray-500">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-transparent outline-none text-purple-400 py-2 placeholder-gray-500"
              />
            </div>

            <div className="w-full sm:w-[90%] md:w-[80%] border-b border-gray-500">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full bg-transparent outline-none text-purple-400 py-2 placeholder-gray-500"
              />
            </div>

            <div className="w-full sm:w-[90%] md:w-[80%] border-b border-gray-500">
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="3"
                className="w-full bg-transparent outline-none text-purple-400 py-2 placeholder-gray-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full sm:w-[90%] md:w-[80%] bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition hover:scale-[1.02] shadow-lg shadow-purple-800/40"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Info Section */}
        <div className="w-full md:w-[50%] flex justify-center items-center md:p-5">
          <div className="w-full rounded-3xl bg-[#18191B] p-6 sm:p-8 flex flex-col gap-8 sm:gap-12 text-white border border-purple-800/30">
            <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left text-purple-400">
              Contact Information
            </h1>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-sm sm:text-base">
              <div>
                <div className="flex items-center gap-2 font-semibold text-purple-500">
                  <Clock size={18} /> Opening Hours
                </div>
                <p className="mt-2 text-gray-300">Monday - Friday</p>
                <p className="text-gray-300">10 AM - 7 PM</p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold text-purple-500">
                  <Mail size={18} /> Email
                </div>
                <p className="mt-2 text-gray-300">xyntechinfo@gmail.com</p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold text-purple-500">
                  <MapPin size={18} /> Address
                </div>
                <p className="mt-2 text-gray-300">Vijay Nagar</p>
                <p className="text-gray-300">Indore, MP - 452010</p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold text-purple-500">
                  <Phone size={18} /> Phone Numbers
                </div>
                <p className="mt-2 text-gray-300">7225885892</p>
                <p className="text-gray-300">7999060005</p>
                <p className="text-gray-300">9754458401</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
