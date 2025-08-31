import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { toast } from "react-toastify";
import axios from "axios";


const Dashboard = () => {


  const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    // setDashboardData(dummyDashboardData);
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + '/api/educator/dashboard', { headers: { Authorization: `Bearer ${token}` } })

      // console.log("dashboard data", data.dashboardData);


      if (data.success) {
        setDashboardData(data.dashboardData)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();

    }
  }, [isEducator]);

  return dashboardData ? (
    // <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
    // 	<div className="space-y-5">
    // <div className="flex flex-wrap gap-5 h-4 items-center">
    // 		<div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-30 rounded-md  ">
    // 			<img src={assets.patients_icon} alt="patients_icon" />
    // 			<div>
    // 				<p className="text-2xl font-medium text-gray-600 ">
    // 					{dashboardData.enrolledStudentsData.length}{" "}
    // 				</p>
    // 				<p className="text-base text-gray-500x">Total Enrollments</p>
    // 			</div>
    // 		</div>

    // 		<div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-30 rounded-md  ">
    // 			<img src={assets.appointments_icon} alt="appointments_icon" />
    // 			<div>
    // 				<p className="text-2xl font-medium text-gray-600 ">
    // 					{dashboardData.totalCourses}
    // 				</p>
    // 				<p className="text-base text-gray-500x">Total Courses</p>
    // 			</div>
    // 		</div>

    // 		<div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-30 rounded-md  ">
    // 			<img src={assets.earning_icon} alt="earning_icon" />
    // 			<div>
    // 				<p className="text-2xl font-medium text-gray-600 ">
    //       {currency}
    // 					{dashboardData.totalEarnings}
    // 				</p>
    // 				<p className="text-base text-gray-500x">Total Earnings</p>
    // 			</div>
    // 		</div>
    // </div>


    // <div className="pt-16">
    //   <h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
    //   <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">

    //   <table className="table-fixed md:table-auto w-full overflow-hidden ">
    //     <thead className="text-gray-900 border-b border-gray-500/20  text-sm text-left">
    //     <tr>
    //       <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
    //       <th className="px-4 py-3 font-semibold ">Student Name</th>
    //       <th className="px-4 py-3 font-semibold ">Course Title</th>
    //     </tr>

    //     </thead>

    //     <tbody className="text-sm text-gray-500">
    //       {dashboardData.enrolledStudentsData.map((item,index)=> (
    //         <tr key={index} className="border-b border-gray-500/20 ">
    //           <td className="px-4 py-3 text-center hidden sm:table-cell">
    //             {index + 1}
    //           </td>
    //           <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
    //             <img 
    //             src={item.student.imageUrl} 
    //             alt="image url"
    //             className="w-9 h-9 rounded-full"
    //              />
    //              <span className="truncate">{item.student.name}</span>
    //           </td>
    //           <td className="px-4 py-3 truncate">{item.courseTitle} </td>

    //         </tr>
    //       ))}

    //     </tbody>

    //   </table>

    //   </div>
    // </div>

    // 	</div>
    // </div>

    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-6 w-full">

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Card 1 */}
          <div className="flex items-center gap-4 shadow-md border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-5 w-full rounded-xl hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <img src={assets.patients_icon} alt="patients_icon" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">{dashboardData.enrolledStudentsData.length}</p>
              <p className="text-sm text-gray-500">Total Enrollments</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 shadow-md border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-5 w-full rounded-xl hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
              <img src={assets.appointments_icon} alt="appointments_icon" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalCourses}</p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 shadow-md border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-5 w-full rounded-xl hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
              <img src={assets.earning_icon} alt="earning_icon" className="w-6 h-6" />
            </div>
            <div className="whitespace-nowrap">
              <p className="text-2xl font-semibold text-gray-800">{currency}{dashboardData.totalEarnings}</p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Latest Enrollments */}
        <div className="pt-12 w-full">
          <h2 className="pb-4 text-lg font-semibold text-gray-800">Latest Enrollments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-xl bg-white shadow border border-gray-200">
            <div className="w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                    <th className="px-4 py-3 font-semibold">Student Name</th>
                    <th className="px-4 py-3 font-semibold">Course Title</th>
                  </tr>
                </thead>

                <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                  {dashboardData.enrolledStudentsData.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition duration-200">
                      <td className="px-4 py-3 text-center hidden sm:table-cell text-gray-500 font-medium">
                        {index + 1}
                      </td>
                      <td className="md:px-4 px-2 py-3 flex items-center gap-3">
                        <img
                          src={item.student.imageUrl}
                          alt="student"
                          className="w-9 h-9 rounded-full ring-2 ring-blue-200 shadow-sm object-cover"
                        />
                        <span className="truncate font-medium">{item.student.name}</span>
                      </td>
                      <td className="px-4 py-3 truncate font-medium text-gray-800">{item.courseTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


  ) : (
    <Loading />
  );
};

export default Dashboard;
