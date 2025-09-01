import React from 'react'
import { assets } from '../../assets/assets'
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";


const CallToAction = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="flex flex-col items-center text-center gap-6 pt-16 pb-28 px-6 md:px-0">
      {/* Heading */}
      <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        Learn anything, <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">anytime</span>, anywhere
      </h1>

      {/* Subheading */}
      <p className="text-gray-500 max-w-2xl text-sm md:text-base">
        Whether you're a student looking to enhance your skills or an educator wanting
        to share knowledge, <span className="font-semibold text-gray-700">Upskill LMS </span>
        is the perfect platform for you.
      </p>

      {/* CTA buttons */}
      <div className="flex items-center font-medium gap-5 mt-4">
        {user ? (
          <a
            href="#"
            className="px-8 py-3 rounded-lg text-white bg-gradient-to-r from-orange-500 to-pink-600 shadow-md hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </a>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="px-8 py-3 rounded-lg text-white bg-gradient-to-r from-orange-500 to-pink-600 shadow-md hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </button>
        )}

        <Link to="/about">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-400/40 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors duration-300">
            Learn more
            <img
              src={assets.arrow_icon}
              alt="arrow_icon"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Link>
      </div>
    </div>

  )
}

export default CallToAction
