import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)
  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-gray-200"
    >
      {/* Thumbnail with overlay */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt="courseThumbnail"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient + overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Floating badge */}
        <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          {course.discount > 0 ? `-${course.discount}% OFF` : "Popular"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="text-sm text-gray-500 mt-1">{course.educator.name}</p>

        {/* Ratings + Reviews */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                className="w-4 h-4"
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {calculateRating(course)} • {course.courseRatings.length} reviews
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            {currency}{" "}
            {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
          </p>
          <button className="px-3 py-1 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors">
            Enroll →
          </button>
        </div>
      </div>
    </Link>

  )
}

export default CourseCard
