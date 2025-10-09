import React from "react";

const WorkoutSchedule = () => {
  const workoutPlan = {
    Monday: {
      title: "Chest Day",
      exercises: ["Bench Press", "Incline Dumbbell Press", "Chest Fly", "Push Ups", "Cable Crossover"],
    },
    Tuesday: {
      title: "Back Day",
      exercises: ["Pull Ups", "Deadlift", "Barbell Row", "Lat Pulldown", "Seated Row"],
    },
    Wednesday: {
      title: "Leg Day",
      exercises: ["Squats", "Leg Press", "Lunges", "Leg Curls", "Calf Raises"],
    },
    Thursday: {
      title: "Shoulder Day",
      exercises: ["Military Press", "Lateral Raise", "Front Raise", "Shrugs", "Arnold Press"],
    },
    Friday: {
      title: "Arms Day",
      exercises: ["Bicep Curls", "Tricep Dips", "Hammer Curls", "Skull Crushers", "Preacher Curl"],
    },
    Saturday: {
      title: "Abs + Core Day",
      exercises: ["Crunches", "Plank", "Hanging Leg Raise", "Russian Twists", "Mountain Climbers"],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0f0f0f] text-white py-16 px-6">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-red-500 uppercase tracking-widest font-semibold mb-2 text-sm md:text-base">
          Train Hard. Stay Consistent.
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4">
          Weekly Gym Workout Schedule
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Follow this power-packed plan to hit every muscle group effectively throughout the week.
        </p>
      </div>

      {/* CARDS */}
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {Object.entries(workoutPlan).map(([day, details], index) => (
          <div
            key={index}
            className="relative bg-[#121212] border border-red-800 rounded-2xl 
                       shadow-[0_0_15px_-5px_rgba(255,0,0,0.25)] 
                       p-6 sm:p-8 w-full sm:w-[45%] lg:w-[30%] transition-all duration-300
                       hover:scale-105 hover:border-red-500 hover:shadow-[0_0_25px_-8px_rgba(255,50,50,0.45)]"
          >
            {/* Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 via-red-600 to-transparent rounded-t-2xl"></div>

            {/* Day Title */}
            <h2 className="text-xl md:text-2xl font-bold text-center text-red-500 mb-2 uppercase">
              {day}
            </h2>
            <h3 className="text-lg text-center font-semibold text-gray-100 mb-5">
              {details.title}
            </h3>

            {/* Exercises */}
            <ul className="space-y-2">
              {details.exercises.map((exercise, i) => (
                <li
                  key={i}
                  className="bg-[#1a1a1a] border border-red-900/40 rounded-lg px-4 py-2 text-sm md:text-base text-gray-300 
                             hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
                >
                  {exercise}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <div className="text-center mt-16">
        <p className="text-gray-500 text-sm">
          *Rest on <span className="text-red-500 font-semibold">Sunday</span> — recovery is as important as training.
        </p>
      </div>
    </div>
  );
};

export default WorkoutSchedule;
