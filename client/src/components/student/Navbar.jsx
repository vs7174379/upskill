import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Navbar = () => {


  const isCourseListPage = location.pathname.includes("/course-list");
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator')
        return;
      }

      const token = await getToken();

      const { data } = await axios.get(backendUrl + '/api/educator/update-role', { headers: { Authorization: `Bearer ${token}` } })
      console.log("educ", data);

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-32 py-4
  bg-gradient-to-r from-white/60 via-white/40 to-white/60 backdrop-blur-xl 
  shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-white/20 sticky top-0 z-50`}
    >
      {/* Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="220"
        height="70"
        viewBox="0 0 220 70"
        fill="none"
        className="cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => navigate("/")}
      >
        <path
          d="M20 30L40 18L60 30L40 42L20 30Z"
          fill="url(#grad)"
        />
        <path d="M40 42V54" stroke="#7b2cbf" strokeWidth="3" />
        <text
          x="80"
          y="38"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="#7b2cbf"
        >
          Up<tspan fill="#f97316">Skill</tspan>
        </text>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="80" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
        {user && (
          <div className="flex items-center gap-8">
            <button
              onClick={becomeEducator}
              className="relative group"
            >
              <span className="transition-colors duration-300 group-hover:text-blue-600">
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <Link to="/my-enrollments" className="relative group">
              <span className="transition-colors duration-300 group-hover:text-blue-600">
                My Enrollments
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        )}

        {/* Auth */}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white 
        shadow-lg hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-3 text-gray-600">
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={becomeEducator}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {isEducator ? "Dashboard" : "Educator"}
            </button>
            <Link
              to="/my-enrollments"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Enrollments
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white 
        shadow-md hover:scale-110 transition-transform duration-300"
          >
            <img src={assets.user_icon} alt="User" className="w-5 h-5 invert" />
          </button>
        )}
      </div>
    </div>


  );
};

export default Navbar;
