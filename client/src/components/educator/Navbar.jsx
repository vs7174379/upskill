import React from "react";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {

	const { user } = useUser();
	return (
		<div className="flex items-center justify-between px-4 md:px-10 py-3 border-b border-gray-300 bg-white shadow-sm">
			{/* Logo */}
			<Link to="/" className="flex items-center">
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
			</Link>

			{/* Right Side */}
			<div className="flex items-center gap-6">
				{/* Greeting */}
				<p className="hidden md:block text-gray-600 font-medium">
					Hi, <span className="text-[#7b2cbf]">{user ? user.fullName : "Developer"}</span> 👋
				</p>

				{/* Profile/User Button */}
				{user ? (
					<UserButton afterSignOutUrl="/" />
				) : (
					<img
						className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7b2cbf] hover:scale-110 transition-transform duration-300 cursor-pointer"
						src={assets.profile_img}
						alt="profile_img"
					/>
				)}
			</div>
		</div>

	);
};

export default Navbar;
