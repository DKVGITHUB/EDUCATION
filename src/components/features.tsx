// Importing React library for creating functional components
import React from "react";

// Functional component for rendering Features section
export default function Features() {
  return (
    // Features section with grid layout and content
    <section className="overflow-hidden pb-4">
      {/* Grid layout with two columns and specified gap */}
      <div className="grid grid-cols-2 gap-5 max-w-[1380px] w-full px-5">
        {/* First column with text content */}
        <div>
          <div className="p-6">
            <h1 className="text-[40px]">Dream. Discover. Decide.</h1>
            <p className="text-base">
              Unleash your potential with personalized career and university
              recommendations. Your future, your way.
            </p>
          </div>
        </div>
        {/* Second column with a card for Career Recommendations */}
        <div className=" bg-[#FEF6EE] rounded-xl">
          <div className="p-6">
            <h1 className="text-[30px]">Career Recommendations</h1>
            <p className="text-base">
              Get personalized career suggestions based on your skills,
              interests, and aspirations.
            </p>
          </div>
        </div>
        {/* Third column with a card for University Recommendations */}
        <div className=" bg-[#F3F6FF] rounded-xl">
          <div className="p-6">
            <h1 className="text-[30px]">University Recommendations</h1>
            <p className="text-base">
              Discover universities that align with your chosen career path and
              personal preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Comments:

// Section Structure:

// The code defines a React functional component named Features representing a section of features.
// Grid Layout:

// A grid layout with two columns is utilized to organize the content, making it responsive and visually appealing.
// Text Content:

// The first column contains a heading and a paragraph providing an overview of the section's purpose.
// Card Structure:

// The second and third columns represent cards with a specific background color, creating a visually distinct presentation.
// Content within Cards:

// Each card includes a heading and a paragraph describing Career Recommendations and University Recommendations, respectively.
// Responsive Design:

// The use of responsive classes (max-w-[1380px], w-full, mx-auto) ensures that the content is appropriately sized on different screen sizes.
// Styling with Tailwind CSS:

// Tailwind CSS classes are utilized for styling, providing a clean and modern look to the section.
// Semantic HTML:

// The HTML structure follows a semantic approach, using appropriate tags and class names for better understanding and maintainability.
