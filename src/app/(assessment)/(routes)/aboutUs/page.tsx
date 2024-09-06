import React from "react";

const aboutUsData = {
  title: "ABOUT US",
  intro:
    "Welcome to EDUALL, your trusted partner in navigating the complex world of education and career planning. At EDUALL, we are committed to empowering students and professionals alike by providing personalized guidance to help you make informed decisions about your future.",
  sections: [
    {
      title: "OUR MISSION",
      content:
        "At EDUALL, our mission is simple: to bridge the gap between education and career success. We believe that every individual has unique strengths, interests, and aspirations, and our goal is to help you align your academic journey with the career path that best suits you.",
    },
    {
      title: "WHAT WE OFFER",
      content:
        "Our comprehensive platform offers a wide range of tools and resources designed to support you at every step of your educational and professional journey. From selecting the right major to finding the perfect career, EDUALL is here to provide you with tailored recommendations based on your grades, interests, and goals. Whether you're a high school student exploring college options or a professional considering a career change, EDUALL has the insights you need to make the right choice.",
    },
    {
      title: "WHY CHOOSE EDUALL?",
      content: "",
      list: [
        {
          title: "Personalized Recommendations:",
          description:
            "Our advanced recommendation system uses data-driven insights to match you with the majors and careers that best fit your profile.",
        },
        {
          title: "Comprehensive Guidance:",
          description:
            "We provide in-depth information on a wide range of majors and career paths, helping you understand the opportunities and challenges ahead.",
        },
        {
          title: "Expert Support:",
          description:
            "Our team of education and career experts is dedicated to helping you achieve your goals, offering personalized advice and resources to ensure your success.",
        },
      ],
    },
    {
      title: "JOIN US ON YOUR JOURNEY",
      content:
        "At EDUALL, we believe that education is the foundation of a fulfilling career. Let us help you take the next step towards a future that aligns with your passions and potential. Join EDUALL today and start your journey towards academic and professional success.",
    },
  ],
};

const AboutUs = () => {
  return (
    <div>
      <h1 className="font-bold">{aboutUsData.title}</h1>
      <h4 className="mt-4">{aboutUsData.intro}</h4>
      {aboutUsData.sections.map((section, index) => (
        <div key={index}>
          <h3 className="font-semibold mt-3 uppercase">{section.title}</h3>
          {section.content && <h4 className="mt-3">{section.content}</h4>}
          {section.list && (
            <ul className="mt-3 list-disc ml-6">
              {section.list.map((item, itemIndex) => (
                <li key={itemIndex} className="text-base">
                  <strong>{item.title}</strong> {item.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
