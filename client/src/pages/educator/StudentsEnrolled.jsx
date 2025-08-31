import React, { useContext, useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const StudentsEnrolled = () => {

  const { backendUrl, getToken, isEducator } = useContext(AppContext)

  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    // setEnrolledStudents(dummyStudentEnrolled);
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students', { headers: { Authorization: `Bearer ${token}` } })
      // console.log("data", data.enrolledStudents);


      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse())
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();

    }
  }, [isEducator])


  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-xl bg-white shadow-md border border-gray-200">

        <table className="table-fixed md:table-auto w-full">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
              <th className="px-4 py-3 font-semibold text-left">Student</th>
              <th className="px-4 py-3 font-semibold text-left">Course Title</th>
              <th className="px-4 py-3 font-semibold text-center">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
            {enrolledStudents.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-orange-50 transition duration-200"
              >
                {/* Index */}
                <td className="px-4 py-3 text-center hidden sm:table-cell font-medium text-gray-600">
                  {index + 1}
                </td>

                {/* Student */}
                <td className="md:px-4 px-2 py-3 flex items-center gap-3">
                  <img
                    src={item.student.imageUrl}
                    alt="student avatar"
                    className="w-9 h-9 rounded-full ring-2 ring-orange-200 shadow-sm object-cover"
                  />
                  <span className="truncate font-medium">{item.student.name}</span>
                </td>

                {/* Course */}
                <td className="px-4 py-3 truncate font-medium text-gray-800">
                  {item.courseTitle}
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-center text-gray-500 text-sm">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>

  ) :
    <Loading />
}

export default StudentsEnrolled
