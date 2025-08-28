import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Logger from "../Logger";

const Navbar = () => {


	const isCourseListPage = location.pathname.includes("/course-list");
	const {navigate, isEducator, backendUrl, setIsEducator, getToken} = useContext(AppContext);
	const { openSignIn } = useClerk();
	const { user } = useUser();

	const becomeEducator = async () => {
		try {
			if(isEducator){
				navigate('/educator')
				return;
			}

			const token = await getToken();

			const {data} = await axios.get(backendUrl + '/api/educator/update-role' , {headers: {Authorization: `Bearer ${token}`}})
			console.log("educ", data);
			
			if(data.success){
				setIsEducator(true);
				toast.success(data.message)
			}else{
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	return (
		<div
  className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 
    bg-white/40 backdrop-blur-xl shadow-lg border-b border-white/30`}
>
  {/* Logo */}
  <img
    onClick={() => navigate("/")}
    src={assets.logo}
    alt="Logo"
    className="w-28 lg:w-32 cursor-pointer hover:scale-105 transition-transform duration-300"
  />

  {/* Desktop Menu */}
  <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
    <Logger />

    {user && (
      <div className="flex items-center gap-8">
        <button
          onClick={becomeEducator}
          className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          {isEducator ? "Educator Dashboard" : "Become Educator"}
        </button>

        <Link
          to="/my-enrollments"
          className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          My Enrollments
        </Link>
      </div>
    )}

    {/* Auth */}
    {user ? (
      <UserButton />
    ) : (
      <button
        onClick={() => openSignIn()}
        className="px-6 py-2 rounded-full bg-blue-600 text-white shadow-md hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
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
        className="p-2 rounded-full bg-blue-600 text-white hover:scale-110 transition-transform duration-300"
      >
        <img src={assets.user_icon} alt="User" className="w-5 h-5 invert" />
      </button>
    )}
  </div>
</div>

	);
};

export default Navbar;
