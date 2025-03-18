"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";
import defaultimg from "@/public/user.png";

interface updateType {
  auth: string|null;
  image: string|null;
}
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [updateAuth, setUpdateAuth] = useState<updateType>({
    auth: "",
    image: "",
  });

  useEffect(() => {
    // Check if the code is running on the client-side (browser)
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth); // Set initial screen width

      const handleResize = () => setScreenWidth(window.innerWidth); // Update screen width on resize
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize); // Clean up event listener
    }
  }, []);

  const getWidth = () => {
    if (screenWidth < 670) return "90%";
    if (screenWidth < 850) return "87%"; // Mobile
    if (screenWidth < 1024) return "60%"; // Tablet
    return "45%"; // Desktop
  };
  useEffect(() => {
    // Check for saved scroll state in sessionStorage
    const savedScrollState = sessionStorage.getItem("isScrolled");
    if (savedScrollState) {
      setIsScrolled(JSON.parse(savedScrollState));
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
      // Save the scroll state in sessionStorage
      sessionStorage.setItem("isScrolled", JSON.stringify(scrolled));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userimage = localStorage.getItem("userimage");
    setUpdateAuth((prev)=>({...prev,image :userimage, auth:token}));
  }, []);

  return (
    <motion.div
      initial={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
      animate={{
        width: isScrolled ? getWidth() : "90%",
        backgroundColor: isScrolled ? "#404040" : "#262626",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={cn(
        `flex h-[8%] bg-neutral-700   fixed items-center top-10 inset-x-0 mx-auto rounded-full z-[5000] pr-2 pl-12 py-2 space-x-4`,
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative dark:text-neutral-50  lg:ml-6 items-center flex  text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </a>
      ))}

      <motion.div
        className={`${
          isScrolled
            ? "lg:pl-[40%] sm:pl-[40%] md:pl-[45%] max-sm:pl-[20%]"
            : "max-sm:pl-[26%] sm:pl-[58%] md:pl-[63%] lg:pl-[75%]"
        } transition-all duration-500`} // Added transition for padding
      >
        {updateAuth.auth ? (
          <Link href="/user">
            <Image
              className="w-[3rem]  rounded-full"
              src={
                updateAuth.image === "default.jpg" || !updateAuth.image
                  ? defaultimg
                  : updateAuth.image
              }
              alt="user-image"
              width={128}
              height={128}
            />
          </Link>
        ) : (
          <Link
            href="/auth"
            className={`p-3 rounded-full  ${
              isScrolled ? "bg-transparent text-orange-500" : "bg-orange-500"
            }`}
          >
            SignUp
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};
