import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

import SocialIcons from "../SocialIcons";

const Footer = () => {
	// Added subscription state
	const [subscribeEmail, setSubscribeEmail] = useState("");

	// Added subscription handler
	const handleSubscribe = () => {
		// Replace this with your subscription API integration if needed
		console.log("Subscribed with:", subscribeEmail);
		alert(`Subscribed with: ${subscribeEmail}`);
		setSubscribeEmail("");
	};

	return (
		<footer className="bg-gray-950 md:px-36 text-left w-full mt-16">
			<div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-12 md:gap-28 py-12 border-b border-white/20">

				{/* Logo + Description */}
				<div className="flex flex-col md:items-start items-center w-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="220"
						height="70"
						viewBox="0 0 220 70"
						fill="none"
						className="cursor-pointer hover:scale-105 transition-transform duration-300"
					>
						<path d="M20 30L40 18L60 30L40 42L20 30Z" fill="url(#grad)" />
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
					<p className="mt-6 text-center md:text-left text-sm text-white/70 max-w-md leading-relaxed">
						Edemy LMS makes education accessible and engaging, connecting students with educators
						through quality courses, interactive tools, and intuitive design.
					</p>
				</div>

				{/* Company Links */}
				<div className="flex flex-col md:items-start items-center w-full">
					<h2 className="font-semibold text-white text-lg mb-5 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-orange-500 after:mt-2 after:rounded-full">
						Company
					</h2>
					<ul className="flex md:flex-col w-full justify-between text-sm text-white/70 md:space-y-3">
						<li>
							<Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
						</li>
						<li>
							<Link to="/about" className="hover:text-orange-400 transition-colors">About us</Link>
						</li>
						<li>
							<Link to="/contact" className="hover:text-orange-400 transition-colors">Contact us</Link>
						</li>
						<li>
							<Link to="" className="hover:text-orange-400 transition-colors">Privacy policy</Link>
						</li>
					</ul>
				</div>

				{/* Newsletter */}
				<div className="flex flex-col items-center md:items-start w-full">
					<h2 className="font-semibold text-white text-lg mb-5 relative after:content-[''] after:block after:w-14 after:h-[2px] after:bg-orange-500 after:mt-2 after:rounded-full">
						Newsletter
					</h2>
					<p className="text-sm text-white/70 max-w-sm leading-relaxed">
						The latest news, articles, and resources, sent to your inbox weekly.
					</p>

					<div className="flex items-center gap-2 pt-5">
						<input
							type="email"
							placeholder="Enter your email"
							className="border border-gray-700 bg-gray-900 text-gray-200 placeholder-gray-400
                     outline-none w-64 h-10 rounded-lg px-3 text-sm shadow-md focus:border-orange-500
                     transition-all duration-300"
							value={subscribeEmail}
							onChange={(e) => setSubscribeEmail(e.target.value)}
						/>
						<button
							onClick={handleSubscribe}
							className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 h-10 text-white text-sm font-medium
                     rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
						>
							Subscribe
						</button>
					</div>

					<div className="ml-6 mt-6 md:ml-0 md:mt-6">
						<SocialIcons />
					</div>
				</div>
			</div>

			{/* Bottom copyright */}
			<p className="py-5 text-center text-xs md:text-sm text-white/50 tracking-wide">
				© 2025 Edemy by GPS. All Rights Reserved.
			</p>
		</footer>

	);
};

export default Footer;
