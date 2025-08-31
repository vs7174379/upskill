import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
	const { id } = useParams();

	const [courseData, setCourseData] = useState(null);
	const [openSections, setOpenSections] = useState({});
	const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
	const [playerData, setPlayerData] = useState(null);

	const {
		allCourses,
		currency,
		calculateRating,
		calculateChapterTime,
		calculateCourseDuration,
		calculateNoOfLectures,
		backendUrl,
		userData,
		getToken,
	} = useContext(AppContext);

	const fetcheCourseData = async () => {
		// const findCourse = allCourses.find((course) => course._id === id);
		// setCourseData(findCourse);

		try {
			const { data } = await axios.get(backendUrl + "/api/course/" + id);
			if (data.success) {
				setCourseData(data.courseData);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const enrollCourse = async () => {
		try {
			if (!userData) {
				return toast.warn("Login to Enroll!");
			}
			if (isAlreadyEnrolled) {
				return toast.warn("Already Enrolled");
			}

			const token = await getToken();
			const { data } = await axios.post(
				backendUrl + "/api/user/purchase",
				{ courseId: courseData._id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (data.success) {
				const { session_url } = data;
				window.location.replace(session_url);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetcheCourseData();
	}, []);

	useEffect(() => {
		if (userData && courseData) {
			setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
		}
	}, [userData, courseData]);

	const toggleSection = (index) => {
		setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	return courseData ? (
		<>
			<div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:placeholder-teal-300 pt-20 text-left">
				<div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

				{/* left column */}
				<div className="max-w-xl z-10 text-gray-500">
					<h1 className="text-3xl md:text-5xl font-bold text-gray-900 relative inline-block">
  {courseData.courseTitle}
  <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded"></span>
</h1>

					<p
						className="pt-4 md:text-base text-sm"
						dangerouslySetInnerHTML={{
							__html: courseData.courseDescription.slice(0, 200),
						}}
					></p>

					{/* review and rating  */}
					<div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
						<p>{calculateRating(courseData)}</p>
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<img
									className="w-3.5 h-3.5"
									key={i}
									src={
										i < Math.floor(calculateRating(courseData))
											? assets.star
											: assets.star_blank
									}
									alt="star"
								/>
							))}
						</div>
						<p className="text-blue-600">
							({courseData.courseRatings.length}{" "}
							{courseData.courseRatings.length > 1 ? "ratings" : "rating"})
						</p>

						<p>
							{courseData.enrolledStudents.length}{" "}
							{courseData.enrolledStudents.length > 1 ? "students" : "student"}
						</p>
					</div>
					<p className="text-sm">
						Course by{" "}
						<span className="text-blue-600 underline">
							{courseData.educator.name}
						</span>
					</p>

					<div className="pt-8 text-gray-800">
						<h2 className="text-xl font-semibold">Course Structure</h2>
						<div className="pt-5">
							{courseData.courseContent.map((chapter, index) => (
								<div
									className="border border-gray-300 bg-white mb-2 rounded"
									key={index}
								>
									<div
										className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
										onClick={() => toggleSection(index)}
									>
										<div className="flex items-center gap-2">
											<img
												className={`transform transition-transform ${
													openSections[index] ? "rotate-180" : ""
												}`}
												src={assets.down_arrow_icon}
												alt="down_arrow_icon"
											/>
											<p className="font-medium md:text-base text-sm">
												{chapter.chapterTitle}
											</p>
										</div>
										<p className="text-sm md:text-default">
											{chapter.chapterContent.length} lectures -{" "}
											{calculateChapterTime(chapter)}{" "}
										</p>
									</div>

									<div
										className={`overflow-hidden transition-all duration-300 ${
											openSections[index] ? "max-h-9g" : "max-h-0"
										}`}
									>
										<ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
											{chapter.chapterContent.map((lecture, i) => (
												<li key={i} className="flex items-start gap-2 py-1">
													{/* <img onClick={()=> setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop()
                                })}
														className="w-4 h-4 mt-1 cursor-pointer"
														src={assets.play_icon}
														alt="play_icon"
													/> */}

													{lecture.isPreviewFree ? (
														<img
															onClick={() =>
																setPlayerData({
																	videoId: lecture.lectureUrl.split("/").pop(),
																})
															}
															className="w-4 h-4 mt-1 cursor-pointer"
															src={assets.play_icon}
															alt="play_icon"
														/>
													) : (
														<img
															className="w-4 h-4 mt-1"
															src={assets.play_icon}
															alt="play_icon"
														/>
													)}

													<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
														<p>{lecture.lectureTitle}</p>
														<div className="flex gap-2">
															{lecture.isPreviewFree && (
																<p
																	onClick={() =>
																		setPlayerData({
																			videoId: lecture.lectureUrl
																				.split("/")
																				.pop(),
																		})
																	}
																	className="text-blue-500 cursor-pointer"
																>
																	Preview
																</p>
															)}
															<p>
																{humanizeDuration(
																	lecture.lectureDuration * 60 * 1000,
																	{ units: ["h", "m"] }
																)}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="py-20 text-sm md:text-default">
						<h3 className="text-xl font-semibold text-gray-800 ">
							Course Description
						</h3>
						<p
							className="pt-3 rich-text"
							dangerouslySetInnerHTML={{
								__html: courseData.courseDescription,
							}}
						></p>
					</div>
				</div>

				{/* right column */}
				<div className="max-w-course-card z-10 shadow-lg rounded-2xl overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] transition-transform hover:scale-105 duration-300">
  {playerData ? (
    <YouTube
      videoId={playerData.videoId}
      opts={{ playerVars: { autoplay: 1 } }}
      iframeClassName="w-full aspect-video"
    />
  ) : (
    <img src={courseData.courseThumbnail} alt="courseThumbnail" className="w-full object-cover" />
  )}

  <div className="p-6 flex flex-col gap-4">
    {/* Countdown Banner */}
    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium w-max">
      <img className="w-4" src={assets.time_left_clock_icon} alt="clock" />
      <span>5 days left at this price!</span>
    </div>

    {/* Price Section */}
    <div className="flex flex-col md:flex-row md:items-end md:gap-4 gap-2">
      <p className="text-3xl md:text-4xl font-bold text-gray-800">
        {currency}{" "}
        {(
          courseData.coursePrice -
          (courseData.discount * courseData.coursePrice) / 100
        ).toFixed(2)}
      </p>
      <p className="text-gray-500 line-through">{currency} {courseData.coursePrice}</p>
      <p className="text-gray-500">{currency} {courseData.discount}% off</p>
    </div>

    {/* Stats Section */}
    <div className="flex items-center gap-4 text-gray-500 text-sm md:text-base">
      <div className="flex items-center gap-1">
        <img src={assets.star} alt="star" className="w-4" />
        <p>{calculateRating(courseData)}</p>
      </div>

      <div className="h-4 w-px bg-gray-300"></div>

      <div className="flex items-center gap-1">
        <img src={assets.time_clock_icon} alt="duration" className="w-4" />
        <p>{calculateCourseDuration(courseData)}</p>
      </div>

      <div className="h-4 w-px bg-gray-300"></div>

      <div className="flex items-center gap-1">
        <img src={assets.lesson_icon} alt="lessons" className="w-4" />
        <p>{calculateNoOfLectures(courseData)} lessons</p>
      </div>
    </div>

    {/* Enrollment Button */}
    <div className="pt-4">
      {isAlreadyEnrolled ? (
        <p className="w-full py-3 text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg">
          Already Enrolled
        </p>
      ) : courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100 === 0 ? (
        <p className="w-full py-3 text-center bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium rounded-lg">
          Free
        </p>
      ) : (
        <button
          onClick={enrollCourse}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:scale-105 transition-transform duration-200"
        >
          Enroll Now
        </button>
      )}
    </div>

    {/* Optional Links */}
    {isAlreadyEnrolled && (
      <div className="pt-2">
        <Link to="/my-enrollments">
          <p className="w-full py-3 text-center bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            My Enrollments
          </p>
        </Link>
      </div>
    )}

    {/* Course Features */}
    <div className="pt-6">
      <p className="text-lg md:text-xl font-semibold text-gray-800">What's in the course?</p>
      <ul className="ml-4 mt-2 list-disc text-gray-500 text-sm md:text-base space-y-1">
        <li>Lifetime access with free updates.</li>
        <li>Step-by-step, hands-on project guidance.</li>
        <li>Downloadable resources and source code.</li>
        <li>Quizzes to test your knowledge.</li>
        <li>Certificate of completion.</li>
      </ul>
    </div>
  </div>
</div>

			</div>

			<Footer />
		</>
	) : (
		<Loading />
	);
};

export default CourseDetails;
