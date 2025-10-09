import React, { useRef, useEffect } from "react";
import { ClockFading, Dumbbell, HeartPulse } from "lucide-react";
import { gsap } from "gsap";

function Hero2() {
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (card) {
        const borderEl = card.querySelector(".card-border");

        // Hover animation
        card.addEventListener("mouseenter", () => {
          gsap.fromTo(
            borderEl,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.5, ease: "power2.out" }
          );
          gsap.to(iconRefs.current[i], {
            scale: 1.2,
            duration: 0.3,
            ease: "bounce.out",
          });
        });

        // Reset on leave
        card.addEventListener("mouseleave", () => {
          gsap.to(iconRefs.current[i], {
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
          });
        });
      }
    });
  }, []);

  const cards = [
    {
      title: "Progression",
      desc: "Track your growth step by step and push your limits every day with structured programs.",
      Icon: ClockFading,
    },
    {
      title: "Workouts",
      desc: "Access personalized workout plans designed by professionals to suit every fitness level.",
      Icon: Dumbbell,
    },
    {
      title: "Nutrition",
      desc: "Get expert nutrition advice and diet plans to complement your training and goals.",
      Icon: HeartPulse,
    },
  ];

  return (
    <div className="w-full mt-4 md:mt-10 flex flex-col md:flex-row gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          className={`relative w-full md:w-1/3 h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px] xl:h-[340px] 
                      flex justify-center items-center bg-[#222222] rounded-lg 
                      ${i < cards.length - 1 ? "border-b-[1px] border-red-700 md:border-0" : ""}`}
        >
          <div className="text-white p-5 sm:p-6 md:p-8 gap-6 w-[90%] flex flex-col">
            {/* Icon */}
            <card.Icon
              ref={(el) => (iconRefs.current[i] = el)}
              className="text-red-700"
              size={48}
            />

            {/* Title + Desc */}
            <div className="flex flex-col gap-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{card.title}</h1>
              <p className="text-sm sm:text-base md:text-[15px] text-gray-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>

          {/* Border animation element (visible on mobile) */}
          <div className="card-border absolute bottom-0 left-0 w-full h-[2px] bg-red-700 scale-x-0 md:hidden"></div>
        </div>
      ))}
    </div>
  );
}

export default Hero2;
