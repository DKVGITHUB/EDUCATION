// Importing React library for creating functional components
import React from "react";

// Functional component for rendering the Footer section
export default function Footer() {
  // Array of social media links with corresponding SVG icons
  const socials = [
    {
      href: "https://twitter.com/",
      svg: (
        // Twitter SVG icon
        <svg
          className="h-4 w-4 fill-[rgba(8,37,82,0.6)] mr-4"
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
          <path d="M24.05 4.33c-.897.396-1.852.66-2.847.787a4.951 4.951 0 002.173-2.758 9.81 9.81 0 01-3.133 1.208 4.928 4.928 0 00-3.608-1.579c-2.736 0-4.937 2.242-4.937 4.99 0 .396.033.776.114 1.138-4.107-.202-7.742-2.19-10.183-5.219a5.06 5.06 0 00-.676 2.522 5.01 5.01 0 002.194 4.146A4.844 4.844 0 01.915 8.95v.055c0 2.424 1.713 4.438 3.959 4.902-.403.111-.84.164-1.296.164-.316 0-.635-.018-.935-.085.64 1.976 2.457 3.428 4.616 3.476a9.864 9.864 0 01-6.125 2.128 9.17 9.17 0 01-1.182-.069 13.812 13.812 0 007.579 2.239c9.09 0 14.06-7.605 14.06-14.197 0-.22-.007-.434-.018-.645a9.908 9.908 0 002.476-2.59z"></path>
        </svg>
      ),
    },
    {
      href: "https://facebook.com/",
      svg: (
        // Facebook SVG icon
        <svg
          className="h-4 w-4 fill-[rgba(8,37,82,0.6)] mr-4"
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
      href: "https://wa.me/message",
      svg: (
        <svg
          className="h-4 w-4 fill-[rgba(8,37,82,0.6)] mr-4"
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
      href: "https://t.me/",
      svg: (
        <svg
          className="h-4 w-4 fill-[rgba(8,37,82,0.6)] mr-4"
          xmlns="http://www.w3.org/2000/svg"
          width="460"
          height="386"
          viewBox="0 0 460 386"
          svg-inline=""
          role="presentation"
          focusable="false"
          tabIndex={-1}
        >
          <path d="M458.689 35.231l-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L245.2 302.631l-51.034 49.086c-5.647 5.647-10.372 10.372-21.256 10.372l7.598-107.722L376.539 77.23c8.523-7.598-1.848-11.809-13.247-4.21L120.95 225.614 16.619 192.96c-22.694-7.086-23.104-22.695 4.723-33.579L429.423 2.166c18.893-7.085 35.427 4.209 29.266 33.065z"></path>
        </svg>
      ),
    },
    {
      href: "https://instagram.com/",
      svg: (
        <svg
          className="h-4 w-4 fill-[rgba(8,37,82,0.6)] mr-4"
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
    {
      href: "https://youtube.com/",
      svg: (
        <svg
          className="h-4 w-4 fill-[rgba(8,37,82,0.6)] mr-4"
          viewBox="0 0 48 48"
          tabIndex={-1}
          svg-inline=""
          role="presentation"
          focusable="false"
        >
          <g>
            <path d="M47.48 13.21s-.46-3.3-1.9-4.74c-1.82-1.92-3.86-1.92-4.8-2.04C34.08 5.94 24 6 24 6s-10.04-.06-16.74.42c-.92.12-2.96.12-4.78 2.04C1.04 9.9.56 13.2.56 13.2S.08 17.09 0 20.96v4.05c.08 3.88.56 7.75.56 7.75s.48 3.3 1.92 4.76c1.82 1.9 4.2 1.84 5.28 2.04 3.76.36 15.82.44 16.24.44 0 0 10.1.02 16.8-.46.92-.12 2.96-.12 4.78-2.04 1.44-1.44 1.92-4.74 1.92-4.74s.48-3.88.5-7.75v-4.05c-.04-3.87-.52-7.75-.52-7.75zM19.14 30V15.98L32 23.26 19.14 30z"></path>
            <path d="M0 0h47.99v48H0z" fill="none"></path>
          </g>
        </svg>
      ),
    },
  ];
  return (
    <footer className="bg-[url(/footer-bg.svg)] bg-no-repeat bg-auto bg-[0_1080px] pb-[50px]">
      <div className="max-w-[1380px] w-full mx-auto my-0 px-5 py-0">
        {/* Section with company information, resources, and contact details */}

        <div className="mt-[100px] mb-10 box-border w-full flex flex-initial flex-row flex-wrap">
          {/* Company Information */}
          <div className=" p-4">
            <h4 className="text-[1.3rem] font-semibold mb-[30px] uppercase">
              Company
            </h4>
            <ul>
              {/* List items with links to company-related pages */}
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  About Us
                </a>
              </li>

              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Careers
                </a>
              </li>
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Ambassadors
                </a>
              </li>

              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Privacy
                </a>
              </li>
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div className=" p-4">
            <h4 className="text-[1.3rem] font-semibold mb-[30px] uppercase">
              Resources
            </h4>
            <ul>
              {/* List items with links to resource-related pages */}
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  FAQs
                </a>
              </li>

              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Security
                </a>
              </li>
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Blog
                </a>
              </li>

              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Details */}
          <div className=" p-4">
            <h4 className="text-[1.3rem] font-semibold mb-[30px] uppercase">
              Contact
            </h4>
            <ul>
              {/* List items with contact information */}
              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  support@edu-all.com
                </a>
              </li>

              <li className="mt-2 mb-0 list-none">
                <a
                  className=" text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-base"
                  href="/"
                >
                  Whatsapp
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Horizontal line as a separator */}
        <hr className="h-px w-full bg-[rgba(8,37,82,0.05)] border-0" />
        {/* Section with social media links */}
        <div className="box-border w-full flex flex-initial flex-row flex-wrap">
          <div className="box-border basis-[58.3333333333%] max-w-[58.3333333333%] p-4">
            <ul>
              {/* Mapping through socials array to render social media icons and links */}
              {socials.map((item, i) => (
                <li key={i} className="inline-block mt-5">
                  {/* Social media link with corresponding SVG icon */}
                  <a
                    className="font-medium text-[rgba(8,37,82,0.6)] transition-opacity duration-[0.3s] ease-[ease] text-[1.46rem]"
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
