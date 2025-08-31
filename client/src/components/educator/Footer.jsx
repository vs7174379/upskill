import SocialIcons from '../SocialIcons'

const Footer = () => {
  return (
    <footer className="relative w-full bg-white border-t border-gray-200">
      {/* Gradient Line on Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7b2cbf] via-[#f97316] to-[#fb923c]" />

      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 bg-white shadow-md rounded-t-lg gap-6">
        {/* Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 220 70"
          fill="none"
          className="h-14 cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <path d="M20 30L40 18L60 30L40 42L20 30Z" fill="url(#grad)" />
          <path d="M40 42V54" stroke="#7b2cbf" strokeWidth="3" />
          <text
            x="80"
            y="38"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="28"
            fontWeight="bold"
          >
            <tspan fill="#7b2cbf">Up</tspan>
            <tspan fill="#f97316">Skill</tspan>
          </text>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="80" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f97316" />
              <stop offset="1" stopColor="#fb923c" />
            </linearGradient>
          </defs>
        </svg>

        {/* Social Icons */}
        <div className="flex gap-4">
          <SocialIcons className="hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Footer Text */}
        <p className="text-xs md:text-sm text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} <span className="font-semibold text-gray-700">Edemy</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
