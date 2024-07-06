"use client";

// Import necessary dependencies and modules
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

// Define navigation links
const Routes = [
  { name: "Assessment", href: "/assessment" },
  { name: "Career", href: "/career" },
  { name: "Universities", href: "/unis" },
  { name: "FAQ'S", href: "/faq" },
];

// Navigation component definition
export const Header = () => {
  // Hooks for managing state
  const pathname = usePathname();

  const isAssessment = pathname === "/assessment";

  // State for managing sticky navigation and mobile navigation visibility
  const [isNavigationSticky, setNavigationSticky] = useState(false);
  const [isMobileNavigationTriggered, setMobileNavigationTriggered] =
    useState(false);

  // Effect hook to handle scroll event and adjust sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Adjust the value (e.g., 100) based on when you want the navigation to become sticky
      if (offset > 100) {
        setNavigationSticky(true);
      } else {
        setNavigationSticky(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle mobile navigation visibility
  const handleMobileNavigationTrigger = () =>
    setMobileNavigationTriggered(!isMobileNavigationTriggered);

  useEffect(() => {
    // Close the mobile navbar when the pathname changes
    setMobileNavigationTriggered(false);
  }, [pathname]);

  // Component rendering
  return (
    <header
      className={cn(
        "GNav text-xl h-24 flex  items-center px-2 absolute right-0 left-0  z-[100]",

        isNavigationSticky &&
          "fixed bg-[#fff] h-[90px] [box-shadow:0_0_22px_rgba(0,_0,_0,_.1)] animate-[slideInDown_.42s_cubic-bezier(.165,_.84,_.44,_1)]"
      )}
    >
      <div
        className={
          isMobileNavigationTriggered
            ? "GmNM absolute h-screen w-screen bg-blue-600 left-0 -top-1 block"
            : "GmNM absolute h-0 w-screen bg-blue-600 left-0 -top-1 hidden"
        }
      >
        <ul
          className={
            isMobileNavigationTriggered
              ? "opacity-100 visible  pl-8 pr-[35px] pt-[7vh] pb-0"
              : "opacity-0 invisible  pl-8 pr-[35px] pt-[7vh] pb-0"
          }
        >
          {Routes.map((item, i) => (
            <li
              key={i}
              className="list-none mb-3.5 opacity-1 transform translate(0px, 0px)"
            >
              <Link
                href={item.href}
                className={
                  "text-white block font-semibold text-4xl leading-[1.2] tracking-[-1px] capitalize bg-[none] shadow-none p-0"
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <ul className="visible opacity-100 pl-8 pr-0 pt-2.5 pb-0">
            <ClerkLoading>
              <Loader
                color="#0066f5"
                className="h-5 w-5 text-muted-foreground animate-spin"
              />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <li className="mt-[18px]">
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant={"link"}
                      className={"mr-7 text-xl bg-[none] text-[#FFFFFF99]"}
                    >
                      CONNEXION{" "}
                    </Button>
                  </SignInButton>
                </SignedOut>
              </li>

              <li className="mt-[18px]">
                <SignedOut>
                  <SignUpButton>
                    <Button
                      variant={"link"}
                      className={"mr-7 text-xl bg-[none] text-[#FFFFFF99]"}
                    >
                      INSCRIPTION{" "}
                    </Button>
                  </SignUpButton>
                </SignedOut>
              </li>
            </ClerkLoaded>
            {/* Sign Up and Log In Routes */}
          </ul>
        </div>
      </div>

      <div className="GNavMCo pl-5 ">
        <div className="flex items-center h-10">
          {/* Logo */}
          <a
            href="/"
            className={`epLOGO text-2xl no-underline max-[986px]:${
              isNavigationSticky ? "hidden" : "flex"
            } `}
          >
            <Image src={"/LOGO.png"} height={40} width={145} alt="logo" />
          </a>

          {/* Navigation Routes */}
          <div className="flex items-center ml w-full ml-20 justify-between">
            <ul className="list-none hidden relative ml-20 mb-1 min-[1030px]:flex">
              {/* Render navigation Routes */}
              {Routes.map((item, i) => (
                <li key={i} className="mx-5 my-0">
                  <Link
                    className={`${
                      item.href === pathname &&
                      "text-[#0066F5] pl-1 border-l-2 border-[#0066F5]"
                    } outline-none uppercase font-bold text-sm cursor-pointer 
                           transition hover:font-bold`}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className=" justify-between hidden items-center min-[1030px]:flex">
              <ClerkLoading>
                <Loader
                  color="#0066f5"
                  className="h-5 w-5 text-muted-foreground animate-spin"
                />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant={"link"}
                      className={
                        "mr-7 text-sm bg-[none] text-[#0066f5] shadow-none  max-[980px]:hidden "
                      }
                    >
                      Login{" "}
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedOut>
                  <SignUpButton>
                    <button className={"button_auth  max-[980px]:hidden "}>
                      Signup
                    </button>
                  </SignUpButton>
                </SignedOut>
              </ClerkLoaded>
            </div>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="block opacity-100 min-[1030px]:hidden min-[1030px]:opacity-0">
            <div
              onClick={handleMobileNavigationTrigger}
              className={
                isMobileNavigationTriggered
                  ? "cursor-pointer inline-block relative h-6 w-6 ml-[15px] mt-1 isActive"
                  : "cursor-pointer inline-block relative h-6 w-6 ml-[15px] mt-1 transition-opacity duration-[0.5s] ease-[ease]"
              }
            >
              <span
                className={
                  "MObiLMEnu bg-[#082552] block absolute transition-transform duration-[0.3s] ease-[ease] rounded-sm top-[5px] text-[1.3rem]"
                }
              ></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
