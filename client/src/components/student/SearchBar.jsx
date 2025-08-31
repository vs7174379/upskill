import React, { useState } from "react";
import { assets } from "../../assets/assets";
import {data, useNavigate} from "react-router-dom"
const SearchBar = ({data}) => {


  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/course-list/' + input)
  }

	return (
		<form
  onSubmit={onSearchHandler}
  className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white/90 
  border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
>
  {/* Search Icon */}
  <img
    src={assets.search_icon}
    alt="search icon"
    className="w-5 h-5 ml-4 mr-2 opacity-70"
  />

  {/* Input */}
  <input
    onChange={(e) => setInput(e.target.value)}
    value={input}
    type="text"
    placeholder="Search for courses..."
    className="flex-1 h-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
  />

  {/* Button */}
  <button
    type="submit"
    className="bg-gradient-to-r from-purple-600 to-orange-500 
    text-white font-medium md:px-8 px-5 md:py-2.5 py-2 rounded-full mr-2 
    hover:scale-105 hover:shadow-lg transition-all duration-300"
  >
    Search
  </button>
</form>

	);
};

export default SearchBar;
