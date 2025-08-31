import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'


const MyCourses = () => {

  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [courses, setCourses] = useState(null)




  const fetchEducatorCourses = async () => {
    // setCourses(allCourses)
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` } })
      // console.log("data", data.courses);


      data.success && setCourses(data.courses)
    } catch (error) {
      toast.error(error.message)
      console.log(error.message);

    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator])

  return courses ? (
    <div className="h-full mb-10 flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        {/* Title */}
        <h2 className="pb-4 text-2xl font-semibold  bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          My Courses
        </h2>

        {/* Table Container */}
        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-orange-500 to-orange-400 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold text-left">All Courses</th>
                <th className="px-4 py-3 font-semibold text-center">Price</th>
                <th className="px-4 py-3 font-semibold text-center">Earnings</th>
                <th className="px-4 py-3 font-semibold text-center">Students</th>
                <th className="px-4 py-3 font-semibold text-center">Created At</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => {
                const finalPrice =
                  course.coursePrice - (course.discount * course.coursePrice) / 100;
                const isFree = finalPrice === 0;

                return (
                  <tr
                    key={course._id}
                    className="hover:bg-orange-50 transition duration-200"
                  >
                    {/* Course Info */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={course.courseThumbnail}
                        alt="CourseImage"
                        className="w-14 h-14 rounded-md shadow-md object-cover"
                      />
                      <span className="truncate font-medium text-gray-800 hidden md:block">
                        {course.courseTitle}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-center font-medium">
                      {isFree ? (
                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                          Free
                        </span>
                      ) : (
                        `$${finalPrice}`
                      )}
                    </td>

                    {/* Earnings */}
                    <td className="px-4 py-3 text-center text-gray-700">
                      {currency}{" "}
                      {Math.floor(
                        course.enrolledStudents.length * finalPrice
                      ).toFixed(2)}
                    </td>

                    {/* Students */}
                    <td className="px-4 py-3 text-center text-gray-700">
                      {course.enrolledStudents.length}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-center text-gray-500 text-sm">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
    :
    <Loading />
}

export default MyCourses
