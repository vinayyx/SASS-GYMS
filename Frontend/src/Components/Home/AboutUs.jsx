import React, { useEffect, useRef } from "react";
import { Dumbbell } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a] py-20 px-6 sm:px-8 md:px-12 lg:px-24 text-white overflow-hidden">
      <div
        ref={sectionRef}
        className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8"
      >
        {/* Header */}
        <div>
          <p className="text-red-600 uppercase tracking-wider font-semibold text-sm sm:text-base">
            About Our Gym
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mt-2">
            Unleash Your <span className="text-red-600">Inner Strength</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-3xl mx-auto leading-relaxed">
            Welcome to{" "}
            <span className="text-red-500 font-semibold">IronPulse Fitness</span>
            — where power, passion, and discipline meet. Our gym is designed to
            help you push past your limits, achieve your goals, and become your
            strongest self.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 w-full">
          {[
            {
              title: "Free Fitness Training",
              desc: "Guided workouts from professional trainers who know your goals.",
            },
            {
              title: "Modern Equipment",
              desc: "Train with world-class, high-performance machines.",
            },
            {
              title: "Premium Environment",
              desc: "A clean, motivating space that inspires strength every day.",
            },
            {
              title: "Personal Programs",
              desc: "Custom plans tailored to your body type and fitness level.",
            },
            {
              title: "24/7 Access",
              desc: "Because your schedule shouldn’t limit your transformation.",
            },
            {
              title: "Community Vibes",
              desc: "Train among motivated individuals and feel the energy.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-[#111] hover:bg-[#181818] transition-all duration-300 rounded-xl p-6 shadow-lg hover:shadow-red-800/30 border border-red-900/30"
            >
              <div className="bg-red-700/20 p-4 rounded-full mb-4">
                <Dumbbell className="text-red-500" size={32} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
            Power. Passion. Performance.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Join the movement today and take the first step towards the best
            version of yourself. Your journey begins here.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
