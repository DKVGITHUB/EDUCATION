// Importing required dependencies
"use client"; // Note: `use client` is the component that run in the browser.

import { useGlobalContext } from "@/app/context/store";
import { careers } from "@/components/dataset";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Define types for various data structures used in the component
type Dos = string[];
type Education = string[];
type Skills = string[];
type Salaries = {
  MAW: string;
  MHW: string;
  TEN: string;
};
type Schools = /* type for schools data */ any; // Please replace this with the actual type

interface CareerCategory {
  name: string;
  categories?: CareerCategory[];
  description?: string;
  dos?: Dos;
  education?: Education;
  skills?: Skills;
  salaries?: Salaries;
  schools?: Schools;
  skillsArray?: Skills;
}

type CareerType = {
  id: string;
  name: string;
  categories: string[];
};

interface CareerProps {
  career: CareerType;
}
[];

// Main component definition
export default function CAREER() {
  // Accessing context data and functions
  const { setData } = useGlobalContext();

  // Component state variables
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [categories, setCategories] = useState<CareerCategory[] | null>(null);

  // Handler for updating active category and associated data
  const handleCategoriesActivity = (index: any) => {
    setActive(index);

    const cat: any = careers[index]?.categories || null;
    localStorage.setItem("Categorie", JSON.stringify(cat));
    setCategories(cat);
  };

  // Effect for handling data updates and loading state
  useEffect(() => {
    const cat: any = careers[active]?.categories || null;
    localStorage.setItem("Categorie", JSON.stringify(cat));
    setCategories(cat);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [active, setData]);

  return (
    <>
      {/* Main Section */}
      <>
        {/* Loading Spinner or Main Content */}
        {loading ? (
          <main className="flex justify-center items-center h-full w-full mt-20 ">
            <Loader2 className="animate-spin" />
          </main>
        ) : (
          <main>
            {/* Grid Layout for Categories */}
            <div className="grid grid-cols-2 gap-0">
              {/* Left Panel - Main Categories */}
              <div className="overflow-y-auto overflow-x-hidden text-xs text-[#333] border-r-[#ddd] border-r border-solid ">
                <ul>
                  {/* Mapping over main career categories */}
                  {careers.map((item, i) => (
                    <li
                      key={i}
                      className={
                        active === i
                          ? "bg-[#F1F2F2] w-full cursor-pointer"
                          : "hover:bg-[#F1F2F2] w-full cursor-pointer"
                      }
                      onClick={() => handleCategoriesActivity(i)}
                    >
                      {/* Category Item */}
                      <div className=" -pt-6 px-3 pb-1 item">
                        <span className="text-base">{item.name}</span>
                        {/* Toggle Icon based on active state */}
                        {active === i ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3.5 h-3.5 absolute right-[50%] -mt-5 mr-2 transition-all"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3.5 h-3.5 absolute right-[50%] -mt-5 mr-2 transition-all"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Panel - Subcategories */}
              <div className="overflow-y-auto overflow-x-hidden text-xs text-[#333] ">
                <ul className="mt-2">
                  {/* Mapping over subcategories of the active category */}
                  {categories?.map((item: any, i: any) => {
                    const name = item.name
                      .toLowerCase()
                      .replace(/\s+/g, "-") // Replace spaces with hyphens
                      .replace(/[^a-z0-9-]/g, ""); // Remove special characters

                    const maskedId = btoa(i);
                    return (
                      <div
                        className="hover:bg-[#F1F2F2] w-full cursor-pointer"
                        key={i}
                      >
                        {/* Link to the detailed page for the subcategory */}
                        <Link
                          href={`/career/${i}`}
                          className="w-full justify-center items-center cursor-pointer "
                        >
                          {/* Subcategory Item */}
                          <div className="-pt-4 px-3 pb-0.5 category-item">
                            <span className="text-base ">{item.name}</span>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </main>
        )}
      </>
    </>
  );
}

// Comments:

//  Structure:

// The component is structured into different sections, including the navigation, loading spinner, and the main content area.
// The main content area is divided into two panels: one for main career categories and another for subcategories.
//   State

//   Management:

// The component uses state variables like loading, active, and categories to manage the UI state.
// The handleCategoriesActivity function updates the active category and its associated

{
  /* Mapping over subcategories of the active category */
}
//{categories?.map((item: any, i: React.Key) => {
//  const name = item.name
//  .toLowerCase()
//.replace(/\s+/g, "-") // Replace spaces with hyphens
//.replace(/[^a-z0-9-]/g, ""); // Remove special characters

//return (
//  <div
//      className="hover:bg-[#F1F2F2] w-full cursor-pointer"
//      key={i}
//    >
//      {/* Link to the detailed page for the subcategory */}
//      <Link
//        href={`/career/${i}`}
//        className="w-full justify-center items-center cursor-pointer "
//      >
//        {/* Subcategory Item */}
//        <div className="-pt-4 px-3 pb-0.5 category-item">
//          <span className="text-base ">{item.name}</span>
//        </div>
//      </Link>
//    </div>
//  );
//})}
