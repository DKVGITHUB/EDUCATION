// Importing React library for creating functional components
import React from "react";
// Importing Image component from Next.js for optimized image handling
import Image from "next/image";

// Functional component for rendering the Hero section
export default function Hero() {
  return (
    <section>
      {/* Container for the Hero section */}
      <div>
        {/* Grid layout for responsive design */}
        <div className="grid grid-cols-[1fr_1fr] gap-20 grid-flow-dense px-0 py-20 max-[980px]:grid-cols-[1fr] max-[980px]:gap-[30px] max-[980px]:pt-[30px]">
          {/* Left column containing testimonial and image */}
          <div className="min-h-[650px] relative opacity-100 transition-opacity duration-[0.7s] ease-[ease] ml-[30px] mt-[30px] max-[980px]:min-h-[450px] max-[980px]:ml-0 max-[980px]:mt-4">
            <div className="overflow-x-hidden bg-[#f5f6fa]">
              {/* Testimonial container with background elements */}
              <div className="absolute opacity-0 invisible h-full w-full left-0 top-0 TEStimoNIALISacTIVE">
                {/* Colored background element for visual appeal */}
                <div
                  className={`absolute top-[-60px] w-[400px] opacity-10 bg-[#2F80ED] -left-20 h-[850px] max-[980px]:w-[300px] max-[980px]-left-10 max-[980px]-top-5`}
                ></div>

                {/* Testimonial card with background styling */}
                <div className="bg-white min-h-[180px] w-[340px] absolute  z-[5] px-8 py-6 -right-2.5 -bottom-10 max-[980px]:left-5 max-[400px]:w-[280px] max-[1024px]:mb-6">
                  {/* Testimonial text */}
                  <blockquote className="text-[.9rem] text-[#6c82a3] leading-[1.35] tracking-[-0.2px] m-0 break-words">
                    The personalized career recommendations helped me focus on
                    what truly matters. I found a path that aligns with my
                    passion, and now I&apos;m pursuing my dream career. Thank
                    you for guiding me
                  </blockquote>
                  {/* Testimonial author details */}
                  <div className="flex justify-between font-medium text-[1.4rem] mt-6">
                    <span className="text-sm">Wuraola F</span>
                    <a target="_blank" className="text-[#0066f5] text-sm">
                      @wuwu
                    </a>
                  </div>
                </div>

                {/* Testimonial image */}
                <div className="h-[650px] w-[520px] overflow-hidden relative max-[980px]:w-full max-[980px]:h-full">
                  <Image
                    width={500}
                    height={500}
                    src={"/wura.jpg"}
                    alt={"wura"}
                    className={`object-cover z-[1] absolute left-0 top-0 translate-x-0 translate-y-0 `}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column containing main heading and subheading */}
          <div className="max-[980px]:mt-4 max-[980px]:row-[1]">
            {/* Main heading */}
            <h1 className="mb-5 text-[5rem] tracking-[-7.5px] leading-[1.1] font-semibold max-[400px]:tracking-[-.5px] max-[980px]:text-[4.2rem] max-[980px]:tracking-[-2px]">
              Discover Your Path to Success.
            </h1>
            {/* Subheading */}
            <h6 className="text-[2rem] font-normal tracking-[-1.5px] mt-4 max-[980px]:text-[2rem] max-[980px]:tracking-[-0.9px]">
              Tailored recommendations for your unique journey. Explore careers,
              discover universities, and set the course for success.
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}

// Comments:

// Importing React and Next.js Image:

// The code imports the React library for creating functional components and the Image component from Next.js for optimized image handling.
// Hero Component:

// The Hero component represents the hero section of the webpage.
// Grid Layout:

// The hero section uses a grid layout for a responsive design, adjusting based on different screen sizes.
// Left Column (Testimonial and Image):

// The left column contains a testimonial, a colored background element, and an image. The opacity and transition effects are applied.
// Testimonial Container:

// The testimonial container includes styled background elements and a testimonial card with text and author details.
// Testimonial Image:

// An image related to the testimonial is displayed with Next.js Image component for optimized loading.
// Right Column (Main Heading and Subheading):

// The right column contains the main heading and subheading describing the purpose of the hero section.
// Responsive Styling:

// Styles and positioning are adjusted for responsiveness on different screen sizes.
// Tailwind CSS Classes:

// Tailwind CSS classes are used for styling, providing a clean and modern look to the hero section.
