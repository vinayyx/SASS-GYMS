// AboutUs.jsx
import React from "react";
import group from "../../assets/group.jpeg";

import {
  Award,
  Users,
  Target,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";

const trainers = [
  {
    id: 1,
    name: "Fit More team",
    title: "Head Strength Coach",
    bio: "10+ years helping athletes build strength & correct form.",
    img: group,
    specialties: ["Strength", "Hypertrophy", "Mobility"],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Vikram",
    text: "Best trainers in town. The programs are tailored and realistic. Love the environment!",
    rating: 5,
  },
  {
    id: 2,
    name: "Riya",
    text: "Clean gym, motivating trainers and results that actually show. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sahil",
    text: "Friendly staff, flexible timings and very supportive community.",
    rating: 4,
  },
];

const amenities = [
  "Modern cardio & weight machines",
  "Personal training & assessments",
  "Nutrition counseling",
  "Locker rooms & showers",
  "Air-conditioned, sanitized equipment",
];

const Feature = ({ icon, title, desc }) => (
  <div className="flex gap-4">
    <div className="w-14 h-14 rounded-lg bg-red-800/80 flex items-center justify-center text-white">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-lg text-white">{title}</h4>
      <p className="text-gray-300 mt-1">{desc}</p>
    </div>
  </div>
);

const Hero = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-black via-[#120202] to-[#2b0b0b]">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-red-500">
              Transform Your Body. Transform Your Life.
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl leading-relaxed">
              We build stronger bodies, confident minds and a supportive fitness
              community. Experienced coaches, smart programming and a modern
              facility — everything you need to achieve lasting results.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition">
                Join Now
              </button>
              <button className="bg-transparent border border-gray-700 px-6 py-3 rounded-xl hover:border-red-600 transition text-gray-200">
                Book Free Trial
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-400">Members</span>
                <span className="font-bold text-xl text-white">1,500+</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-400">Trainers</span>
                <span className="font-bold text-xl text-white">12</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-400">Classes / Week</span>
                <span className="font-bold text-xl text-white">40+</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-400">Years</span>
                <span className="font-bold text-xl text-white">7</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-[#111] p-4 rounded-2xl border border-gray-800 shadow-xl">
              <img
                src="https://via.placeholder.com/700x420.png?text=Gym+Interior"
                alt="gym interior"
                className="w-full rounded-lg object-cover"
              />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="p-2 bg-[#0b0b0b] rounded text-center">
                  <p className="text-sm text-gray-400">Personal Training</p>
                </div>
                <div className="p-2 bg-[#0b0b0b] rounded text-center">
                  <p className="text-sm text-gray-400">Group Classes</p>
                </div>
                <div className="p-2 bg-[#0b0b0b] rounded text-center">
                  <p className="text-sm text-gray-400">Nutrition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY + MISSION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-red-500">Our Story</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Started by fitness enthusiasts with a simple idea — provide
              evidence-backed training, positive environment and honest pricing.
              We've grown from a small studio to a full-service gym while
              keeping the same values: results, safety, and community.
            </p>

            <div className="mt-6 space-y-4">
              <Feature
                icon={<Award size={20} />}
                title="Certified Coaches"
                desc="All trainers are certified with proven track records."
              />
              <Feature
                icon={<Users size={20} />}
                title="Community Driven"
                desc="Small group sessions, member events and progress socials."
              />
              <Feature
                icon={<Target size={20} />}
                title="Result Focused"
                desc="Programs designed to deliver measurable progress."
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-red-500">
              Mission & Vision
            </h2>
            <div className="mt-4 text-gray-300 space-y-3">
              <p>
                <strong className="text-white">Mission:</strong> Empower people
                with programs that are safe, fun and effective.
              </p>
              <p>
                <strong className="text-white">Vision:</strong> To be the most
                trusted fitness hub where long-term health is built.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#0b0b0b] rounded shadow-inner border border-gray-800">
                  <Clock size={18} className="text-red-500" />
                  <p className="text-sm text-gray-300 mt-2">24/7 Access</p>
                </div>
                <div className="p-4 bg-[#0b0b0b] rounded shadow-inner border border-gray-800">
                  <CheckCircle size={18} className="text-red-500" />
                  <p className="text-sm text-gray-300 mt-2">Proven Methods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="bg-[#090909] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-red-500 mb-6">
            Meet Our Trainers
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {trainers.map((t) => (
              <div
                key={t.id}
                className="bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-sm"
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="rounded-xl w-full h-44 object-cover"
                />
                <h4 className="mt-4 font-semibold text-lg">{t.name}</h4>
                <p className="text-sm text-gray-400">{t.title}</p>
                <p className="mt-3 text-gray-300 text-sm">{t.bio}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 bg-red-800/30 rounded-full text-red-300 border border-red-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div>
          <div>
            <h3 className="text-2xl font-bold text-red-500 mb-4">
              What Our Members Say
            </h3>
            <div className="space-y-4">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-[#111] p-4 rounded-xl border border-gray-800"
                >
                  <p className="text-gray-300">“{test.text}”</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold">{test.name}</span>
                    <span className="text-sm text-yellow-400">
                      {"★".repeat(test.rating)}{" "}
                      <span className="text-gray-500">({test.rating})</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="bg-[#0b0b0b] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-red-500 mb-6">
            Facilities & Amenities
          </h3>
          <ul className="grid sm:grid-cols-2 gap-4">
            {amenities.map((a, idx) => (
              <li
                key={idx}
                className="bg-[#111] p-4 rounded-xl border border-gray-800 flex items-start gap-4"
              >
                <div className="pt-1">
                  <CheckCircle className="text-red-500" />
                </div>
                <div>
                  <p className="font-semibold">{a}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Premium quality and maintained daily.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT / MAP / CTA */}
  

      {/* FOOTER CTA */}
      <footer className="bg-gradient-to-t from-[#1a0a0a] to-black py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold text-white">Ready to start?</h4>
            <p className="text-gray-400">
              Join our fitness family and see real results.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-700">
              Join Now
            </button>
            <button className="bg-transparent border border-gray-700 px-6 py-3 rounded-xl text-gray-200 hover:border-red-600">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
