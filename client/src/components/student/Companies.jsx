import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className="pt-16 text-center bg-top">
      {/* Heading */}
      <p className="text-sm md:text-base text-gray-600 font-medium">
        🌍 Trusted by professionals from top companies
      </p>

      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-8">
        {[assets.microsoft_logo, assets.walmart_logo, assets.accenture_logo, assets.adobe_logo, assets.paypal_logo].map(
          (logo, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md px-6 py-3 flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logo}
                alt="company_logo"
                className="w-16 md:w-24 object-contain"
              />
            </div>
          )
        )}
      </div>
    </div>

  )
}

export default Companies
