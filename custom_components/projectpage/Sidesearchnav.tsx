"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Tick from "./Tick";
import Image from "next/image";
import uparrow from "@/public/right-chevron.png";
import projectsdetails from "@/app/projects/projectsdetails";
import Difftic from "./Difftic";

interface projectcarddetails {
  _id: string,
  projectTitle: string;
  projectTags: [string];
  difficulty: string;
  credits: number;
  active: string;
  projectdescription: string;
}
const Sidesearchnav: React.FC<{
  setCardDetails: React.Dispatch<React.SetStateAction<projectcarddetails[]>>;
}> = ({ setCardDetails }) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeDiffTags, setActiveDiffTags] = useState<string|null>(null);
  const [openDiv, setOpenDiv] = useState({
    framework: true,
    backend: false,
  });

  const variant = {
    initial: {
      height: "0",
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
    animate: {
      height: "auto",
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  const fetchProjects = async (queryString: string) => {
    
    const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/projects/allprojectinfo${queryString}`;
  
    try {
      const response = await projectsdetails(URL);
      if (response && response.projects) setCardDetails(response.projects);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  const handleTagClick = async (tag: string) => {
    setActiveTags((prevTags) => {
      const isTagActive = prevTags.includes(tag);
      const updatedTags = isTagActive
        ? prevTags.filter((t) => t !== tag) // Remove the tag if it's already active
        : [...prevTags, tag]; // Add the tag if it's not active
       
        console.log(updatedTags)
      const queryString = updatedTags.length
        ? `?projectTags=${updatedTags.join(",")}`
        : "";

      // Send the query to fetch projects
      fetchProjects(queryString);

      return updatedTags;
    });
  };
  const handleTagDiffcultyClick = async (tag: string) => {
    setActiveDiffTags((prev) => {
      const newActiveTag = prev === tag ? null : tag; // Toggle the active tag
      const queryString = newActiveTag
        ? `?difficulty=${newActiveTag}`
        : ""
  
      fetchProjects(queryString); // Fetch projects with updated query
      return newActiveTag; // Update state
    });
  };
  return (
    <div className="w-full h-full flex flex-col justify-start  items-end">
      <div className=" w-[85%]  h-auto p-2 flex flex-col  relative  gap-2">
        {["html", "css", "js", ].map((tag) => (
          <Tick
            key={tag}
            text={tag}
            active={activeTags.includes(tag)}
            onClick={() => handleTagClick(tag)}
          />
        ))}
      </div>

      <div className=" w-[85%]    h-auto">
        <div className="flex border pl-2 border-neutral-800 rounded-md  w-full items-center  ">
          <button
            onClick={() =>
              setOpenDiv((prev) => ({
                ...prev,
                framework: !prev.framework,
                backend: false,
              }))
            }
            className=" h-full w-[15%] flex pr-2 justify-end items-center"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={
                openDiv.framework
                  ? { rotate: 90, transition: { duration: 0.1 } }
                  : { rotate: 0, transition: { duration: 0.1 } }
              }
            >
              <Image src={uparrow} className="w-[1rem]" alt="" />
            </motion.div>
          </button>
          <div className="w-[85%] h-full   p-2 flex justify-start items-center ">
            Difficulty
          </div>
        </div>
        <motion.div
          variants={variant}
          initial="initial"
          animate={openDiv.framework ? "animate" : "initial"}
          className=" flex flex-col max-sm:items-center items-end  w-full  overflow-hidden"
        >
          <div className="w-full  p-2  flex flex-col gap-2  h-full">
            {["easy", "medium" ,"hard"].map((tag) => (
              <Difftic
                key={tag}
                text={tag}
                active={activeDiffTags===tag}
                onClick={() => handleTagDiffcultyClick(tag)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className=" w-[85%] h-auto ">
        <div className="flex border pl-2  rounded-md border-neutral-800 w-full items-center ">
          <button
            onClick={() =>
              setOpenDiv((prev) => ({
                ...prev,
                backend: !prev.backend,
                framework: false,
              }))
            }
            className="w-[15%] h-full flex pr-2 justify-end items-center"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={
                openDiv.backend
                  ? { rotate: 90, transition: { duration: 0.1 } }
                  : { rotate: 0, transition: { duration: 0.1 } }
              }
            >
              <Image src={uparrow} className="w-[1rem]" alt="" />
            </motion.div>
          </button>
          <div className="h-full  w-[85%] p-2 flex justify-start items-center ">
            Libraries
          </div>
        </div>
        <motion.div
          variants={variant}
          initial="initial"
          animate={openDiv.backend ? "animate" : "initial"}
          className=" flex flex-col max-sm:items-center items-end  w-full  overflow-hidden"
        >
          <div className="w-full p-2  flex flex-col gap-2  h-full">
            {["react", "bootstrap", "tailwind"].map((tag) => (
              <Tick
                key={tag}
                text={tag}
                active={activeTags.includes(tag)}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidesearchnav;
