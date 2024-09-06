// Importing React library for creating functional components
import React from "react";

// Functional component for rendering the Footer section
export default function Footer() {
  // Array of social media links with corresponding SVG icons
  const socials = [
    {
      href: "https://www.facebook.com/share/ukmD2J7E7RkubEfw/?mibextid=LQQJ4d",
      svg: (
        // Facebook SVG icon
        <svg
          className="h-4 w-4 fill-white mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="#022B69"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          svg-inline=""
          role="presentation"
          focusable="false"
          tabIndex={-1}
        >
          <path d="M24 4c0-2.102-1.897-4-4-4H4C1.899 0 .002 1.898.002 4v16c0 2.102 1.897 4 4 4h8v-9.066H9.068v-4H12V9.376c0-2.688 2.018-5.109 4.5-5.109h3.233v4h-3.233c-.354 0-.767.43-.767 1.074v1.593h4v4h-4v9.067h4.267c2.102 0 4-1.899 4-4V4z"></path>
        </svg>
      ),
    },
    {
      href: "https://wa.me/233260870247",
      svg: (
        <svg
          className="h-4 w-4 fill-white mr-4"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          svg-inline=""
          role="presentation"
          focusable="false"
          tabIndex={-1}
        >
          <path d="M16.29 0C7.616 0 .582 6.978.582 15.589c0 2.945.823 5.698 2.253 8.049L0 32l8.699-2.762a15.743 15.743 0 007.592 1.94c8.676 0 15.709-6.982 15.709-15.59C32 6.979 24.967 0 16.29 0zm7.811 21.509c-.369.917-2.04 1.753-2.779 1.789-.738.04-.757.571-4.773-1.172-4.017-1.747-6.433-5.989-6.622-6.263-.19-.271-1.555-2.217-1.483-4.176.075-1.96 1.146-2.884 1.528-3.266.382-.385.82-.454 1.088-.457.316-.006.522-.01.754 0 .235.01.584-.049.888.76.304.81 1.032 2.796 1.123 3.002.092.202.15.437.007.698-.144.262-.219.425-.425.65-.209.226-.44.503-.627.676-.209.19-.427.399-.205.807.218.408.976 1.74 2.125 2.837 1.48 1.41 2.756 1.881 3.151 2.093.396.216.63.19.872-.065.242-.258 1.045-1.123 1.33-1.512.283-.388.548-.313.91-.166.363.147 2.296 1.182 2.69 1.397.396.212.657.323.752.493.095.16.065.957-.304 1.875z"></path>
        </svg>
      ),
    },

    {
      href: "https://www.instagram.com/eduall24?igsh=a3VkeXdkYzA1cDN6&utm_source=qr",
      svg: (
        <svg
          className="h-4 w-4 fill-white mr-4"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          svg-inline=""
          role="presentation"
          focusable="false"
          tabIndex={-1}
        >
          <path d="M23.041 0c4.843 0 8.782 3.94 8.782 8.782v14.259c0 4.842-3.94 8.782-8.782 8.782H8.782C3.94 31.823 0 27.883 0 23.041V8.782C0 3.94 3.94 0 8.782 0h14.259zM29 23.041V8.782a5.966 5.966 0 00-5.959-5.959H8.782a5.965 5.965 0 00-5.958 5.959v14.259A5.965 5.965 0 008.782 29h14.259A5.965 5.965 0 0029 23.041zM15.912 7.712c4.522 0 8.2 3.678 8.2 8.2s-3.678 8.2-8.2 8.2-8.2-3.678-8.2-8.2c0-4.522 3.678-8.2 8.2-8.2zm0 13.576c2.965 0 5.377-2.412 5.377-5.376s-2.412-5.377-5.377-5.377-5.377 2.412-5.377 5.377a5.382 5.382 0 005.377 5.376zm8.544-15.97c.546 0 1.08.22 1.464.606.386.384.606.919.606 1.464 0 .544-.22 1.079-.606 1.464a2.091 2.091 0 01-1.464.606 2.087 2.087 0 01-1.463-.606 2.087 2.087 0 01-.608-1.464c0-.546.222-1.08.608-1.464a2.079 2.079 0 011.463-.606z"></path>
        </svg>
      ),
    },
  ];
  return (
    <footer className="bg-[#242628]">
      <div className="max-w-[1380px] w-full mx-auto my-0 px-5 py-0">
        {/* Section with company information, resources, and contact details */}

        <div className="mt-[100px] mb-10 box-border w-full flex flex-initial flex-row flex-wrap justify-between">
          {/* Company Information */}
          <div className=" p-4">
            <h4 className="text-[1.3rem] text-white font-semibold mb-[30px] uppercase">
              Company
            </h4>
            <ul>
              {/* List items with links to company-related pages */}
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-white transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/aboutUs"
                >
                  About Us
                </a>
              </li>

              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-white transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/career"
                >
                  Careers
                </a>
              </li>

              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-white transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/privacy"
                >
                  Privacy
                </a>
              </li>
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-white transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/terms"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div className=" p-4">
            <h4 className="text-[1.3rem] text-white font-semibold mb-[30px] uppercase">
              Resources
            </h4>
            <ul>
              {/* List items with links to resource-related pages */}
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-white transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/faq"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Details */}
          <div className=" p-4">
            <h4 className="text-[1.3rem] text-white font-semibold mb-[30px] uppercase">
              Contact
            </h4>
            <ul>
              {/* List items with contact information */}
              <li className="mt-2 mb-0 list-none">
                <p className=" text-white transition-opacity duration-[0.3s] ease-[ease] text-base">
                  Chachaabla05gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Section with social media links */}
        <div className="box-border w-full flex flex-initial flex-row flex-wrap">
          <div className="box-border basis-[58.3333333333%] max-w-[58.3333333333%] p-4">
            <ul>
              {socials.map((item, i) => (
                <li key={i} className="inline-block mt-5">
                  <a
                    className="font-medium text-white transition-opacity duration-[0.3s] ease-[ease] text-[1.46rem]"
                    href={item.href}
                  >
                    {item.svg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Comments:

// Importing React:

// The code imports the React library to create functional components.
// Footer Component:

// The Footer component represents the footer section of the webpage.
// Social Media Links:

// An array named socials contains objects with social media platform links and corresponding SVG icons.
// Footer Structure:

// The JSX structure defines the layout of the footer, including sections for company information, resources, contact details, and social media links.
// Links and Lists:

// The code uses unordered lists (ul) and list items (li) to organize links.
// Responsive Design:

// The footer layout is designed to be responsive, adjusting its appearance based on different screen sizes.
// Background Image:

// The footer includes a background image with specified styles.
// Horizontal Line Separator:

// A horizontal line is added as a separator between sections.
// Social Media Icons:

// Social media icons are rendered dynamically by mapping through the socials array.
// Tailwind CSS Styling:

// The code utilizes Tailwind CSS classes for styling, providing a clean and modern look to the footer.
