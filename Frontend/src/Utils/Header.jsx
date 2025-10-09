import React from 'react'
import texture from "../assets/texture.png"

function Header({title}) {
  return (
    

    <div>

      <div className="w-full h-[30vh] mt-24 bg-[#18191B] md:h-[50vh] relative">
            {/* Background Image */}
            <img
              className="absolute top-0 left-0 h-full w-full object-cover opacity-60"
              src={texture}
              alt="texture"
            />
      
            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-700">
              <div className="relative flex items-center justify-center">
                {/* Border div (behind text) */}
                <div className="absolute w-[80vw] sm:w-[50vw] h-[20vw] sm:h-[12vw] border-[2px] border-white rounded-full rotate-6 border-opacity-15"></div>
      
                {/* Main title inside parent */}
                <div className="relative flex items-center justify-center w-[80vw] sm:w-[50vw] h-[20vw] sm:h-[12vw] border-[2px] border-white border-opacity-15 rounded-full">
                  <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide z-8 ">
                   {title}
                  </h1>
                </div>
              </div>
            </div>
          </div>

    </div>
       
    
  )
}

export default Header