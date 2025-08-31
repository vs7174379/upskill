import React from "react";
import Footer from "./student/Footer";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const About = () => {
	const { user } = useUser();
	const { openSignIn } = useClerk();
	
	return (
		<>
			<div className="w-full mx-auto px-6 py-16 bg-gradient-to-b from-orange-100 via-white to-white">
  {/* Heading */}
  <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
    About <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">UpSkill </span>LMS
  </h1>
  <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
    Empowering learners and educators with a seamless online learning experience.
  </p>

  {/* Mission Section */}
  <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-orange-100 mb-12">
    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
    <p className="text-gray-600 leading-relaxed">
      At <span className="font-semibold text-orange-600">UpSkill LMS</span>, we strive to make 
      <span className="font-medium"> education accessible and engaging</span> for everyone.  
      We connect students and educators by providing high-quality courses,  
      interactive tools, and an intuitive learning journey.
    </p>
  </div>

  {/* Why Choose Us */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div className="p-6 rounded-xl border border-orange-200 bg-white shadow-md hover:shadow-xl transition duration-300 text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">📚 Quality Courses</h3>
      <p className="text-gray-600">Learn from expert educators through structured and engaging content.</p>
    </div>
    <div className="p-6 rounded-xl border border-orange-200 bg-white shadow-md hover:shadow-xl transition duration-300 text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">⚡ Interactive Learning</h3>
      <p className="text-gray-600">Track progress, complete quizzes, and work on hands-on projects.</p>
    </div>
    <div className="p-6 rounded-xl border border-orange-200 bg-white shadow-md hover:shadow-xl transition duration-300 text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">🌍 Global Access</h3>
      <p className="text-gray-600">Learn anytime, anywhere, on any device — without limits.</p>
    </div>
  </div>

  {/* Join Us */}
  <div className="mt-16 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-3">
      Join <span className="text-orange-600">UpSkill LMS</span> Today
    </h2>
    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
      Students, enhance your skills. Educators, share your expertise.  
      Together, let’s build the future of online learning.
    </p>

    {user ? (
      <Link
        to="/"
        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
      >
        Get Started
      </Link>
    ) : (
      <button
        onClick={() => openSignIn()}
        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
      >
        Get Started
      </button>
    )}
  </div>
</div>

<Footer />

		</>
	);
};

export default About;
