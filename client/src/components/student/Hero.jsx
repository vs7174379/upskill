import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'
import { motion } from "framer-motion";
import Companies from './Companies';
const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-28 pt-24 px-6 md:px-0 space-y-8 text-center bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute top-24 -left-28 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 -right-28 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl"></div>

      {/* Heading */}
      <h1 className="relative max-w-4xl mx-auto font-extrabold leading-tight tracking-tight text-4xl md:text-5xl text-gray-900">
        <span className="block">Empower your <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">future</span></span>
        <span className="block mt-2">with courses <span className="relative inline-block">
          designed to fit your choice
          <span className="absolute -bottom-2 left-0 w-full h-2 bg-orange-300/60 rounded-lg"></span>
        </span>
        </span>
      </h1>

      {/* Subtext */}
      <p className="hidden md:block text-gray-600 max-w-2xl mx-auto text-lg">
        World-class instructors, interactive content, and a supportive community—helping you achieve your personal and professional goals.
      </p>

      <p className="md:hidden text-gray-600 max-w-sm mx-auto text-base">
        Learn from the best instructors and achieve your goals—anytime, anywhere.
      </p>

      {/* Search Bar */}
      <SearchBar />
      <Companies/>
    </div>

  )
}

export default Hero
