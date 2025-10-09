const NewsLater = () => {
  return (
    <div className="px-4 p-7 bg-black md:px-8">
      <div className="flex flex-col items-center w-full  bg-[#222222] mb-4 rounded-2xl px-6 md:px-12 py-12 md:py-16 mx-auto  text-white">
        {/* Header */}
        <div className="flex flex-col items-center  text-center max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Stay Inspired</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400/90 mt-3">
            Join our newsletter and be the first to discover new updates, exclusive offers, and inspiration.
          </p>
        </div>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full max-w-2xl">
          <input
            type="email"
            className="bg-white/10 text-white placeholder-gray-300 px-4 py-3 sm:py-3 md:py-3 border border-white/20 rounded w-full sm:flex-1 outline-none transition-all focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <button className="flex items-center justify-center gap-2 bg-black px-6 py-3 rounded text-white font-medium transition-transform active:scale-95 hover:bg-gray-900">
            Subscribe
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m14 0-4 4m4-4-4-4" />
            </svg>
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-gray-400 mt-6 text-xs sm:text-sm text-center max-w-xs sm:max-w-md">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </div>
  );
};

export default NewsLater;
