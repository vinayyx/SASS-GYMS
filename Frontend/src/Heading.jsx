import React from "react";

function Heading({ title }) {
  return (
    <div className="w-full px-4 md:px-8 bg-black flex flex-col items-center justify-center text-center min-h-[20vh] md:min-h-[25vh] gap-4">
      {/* Main Title */}
      <h1
        className="
          font-extrabold 
          text-2xl sm:text-4xl md:text-5xl lg:text-6xl 
          text-white leading-tight
        "
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        className="
          text-gray-300 
          text-sm sm:text-base md:text-lg 
          max-w-2xl
        "
      >
        From vision to action, we make goals achievable.
      </p>
    </div>
  );
}

export default Heading;
