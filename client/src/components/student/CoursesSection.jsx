import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import Loading from "./Loading";

const CoursesSection = () => {
    const { allCourses } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            setLoading(false);
        }
    }, [allCourses]);

    return (
        <div className="py-20 md:px-40 px-8 bg-white">
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900">
                    Learn from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">Best</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 mt-3">
                    Discover our top-rated courses across various categories. From coding and design to
                    business and wellness, our courses are crafted to deliver results.
                </p>
            </div>

            {/* Courses Grid */}
            {loading ? (
                <Loading />
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0 md:my-16 my-10">
                    {allCourses.slice(0, 4).map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            )}

            {/* CTA Button */}
            <div className="flex justify-center">
                <Link
                    to={"/course-list"}
                    onClick={() => scrollTo(0, 0)}
                    className="inline-block text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-orange-500 px-8 py-3 rounded-full shadow-md hover:shadow-lg transition"
                >
                    Show all courses
                </Link>
            </div>
        </div>

    );
};

export default CoursesSection;
