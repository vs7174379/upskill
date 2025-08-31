import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
	return (
		<div className="pb-16 px-6 md:px-8">
			{/* Heading */}
			<h2 className="text-3xl font-bold text-gray-900 text-center">
				Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">Learners</span>
			</h2>
			<p className="md:text-base text-gray-600 text-center mt-2 max-w-xl mx-auto">
				Inspiring stories of growth and transformation.
			</p>

			{/* Testimonial Grid */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
				{dummyTestimonial.map((testimonial, index) => (
					<div
						key={index}
						className="relative bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
					>
						{/* Quote Icon */}
						<div className="absolute -top-4 -left-3 bg-purple-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
							<span className="text-lg font-bold">“</span>
						</div>

						{/* Feedback */}
						<p className="text-gray-700 text-sm leading-relaxed">
							{testimonial.feedback}
						</p>

						{/* Footer */}
						<div className="flex items-center gap-3 mt-5">
							<img
								className="w-10 h-10 rounded-full ring-2 ring-orange-400/30"
								src={testimonial.image}
								alt={testimonial.name}
							/>
							<div>
								<h1 className="text-sm font-semibold text-gray-900">
									{testimonial.name}
								</h1>
								<p className="text-xs text-gray-600">{testimonial.role}</p>
							</div>
						</div>

						{/* Stars */}
						<div className="flex gap-0.5 mt-2">
							{[...Array(5)].map((_, i) => (
								<img
									className="h-4"
									key={i}
									src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
									alt="star"
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>

	);
};

export default TestimonialsSection;
