import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled ', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ]


  return isEducator && (
    <div className="md:w-64 w-20 min-h-screen border-r border-gray-200 bg-white flex flex-col py-4 shadow-sm">
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === "/educator"}
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-3 rounded-lg mx-2 mb-2 transition-all duration-300 
        ${isActive
              ? "bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-6 h-6 opacity-80"
          />
          <p className="hidden md:block font-medium">{item.name}</p>
        </NavLink>
      ))}
    </div>

  )
}

export default Sidebar
