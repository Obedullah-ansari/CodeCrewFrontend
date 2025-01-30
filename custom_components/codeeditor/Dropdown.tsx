"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import uparrow from "@/public/right-chevron.png";
import resources from "@/app/editor/resources";

interface DropdownProps {
  activeFile: "html" | "css" | "js";
  setActiveFile: React.Dispatch<React.SetStateAction<"html" | "css" | "js">>;
}

type resourcesType = string[];

interface tabOpenType {
  fornt: boolean;
  resour: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ activeFile, setActiveFile }) => {
  const [openDiv, setOpenDiv] = useState<tabOpenType>({
    fornt: true,
    resour: false,
  });
  const [resourcesArray, setResourcesArray] = useState<
    resourcesType | undefined
  >();
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

  useEffect(() => {
    const fetchingResources = async () => {
      const problemid = localStorage.getItem("problemid");
      const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/images/resources/${problemid}`;
      const response = await resources({ URL });
      if (response) {
        setResourcesArray(response);
      }
    };
    fetchingResources();
  }, []);


  return (
    <div className="w-full h-auto">
      <div className="flex pl-2 bg-neutral-700 w-full items-center">
        <button
          onClick={() => setOpenDiv((prev) => ({ ...prev, fornt: !prev.fornt }))}
          className="w-[15%] h-full flex pr-2 justify-end items-center"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={
              openDiv.fornt
                ? { rotate: 90, transition: { duration: 0.1 } }
                : { rotate: 0, transition: { duration: 0.1 } }
            }
          >
            <Image src={uparrow} className="w-[1rem]" alt="" />
          </motion.div>
        </button>
        <div className="h-full w-[85%] p-2 flex justify-start items-center">
          Frontend
        </div>
      </div>
      <motion.div
        variants={variant}
        initial="initial"
        animate={openDiv.fornt ? "animate" : "initial"}
        className="flex flex-col items-end w-full overflow-hidden"
      >
        <div className="w-full flex items-start flex-col h-full">
          {["html", "css", "js"].map((file) => (
            <button
              key={file}
              className={`dropbtn bg-neutral-900 flex justify-start pl-[26%] border-b border-neutral-800 w-full p-1 ${
                activeFile === file ? "text-yellow-500" : ""
              }`}
              onClick={() => setActiveFile(file as "html" | "css" | "js")}
            >
              {`index.${file}`}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="flex pl-2 bg-neutral-700 w-full items-center">
        <button
          onClick={() => setOpenDiv((prev) => ({ ...prev, resour: !prev.resour }))}
          className="w-[15%] h-full flex pr-2 justify-end items-center"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={
              openDiv.resour
                ? { rotate: 90, transition: { duration: 0.1 } }
                : { rotate: 0, transition: { duration: 0.1 } }
            }
          >
            <Image src={uparrow} className="w-[1rem]" alt="" />
          </motion.div>
        </button>
        <div className="h-full w-[85%] p-2 flex justify-start items-center">
          Images
        </div>
      </div>
      <motion.div
        variants={variant}
        initial="initial"
        animate={openDiv.resour ? "animate" : "initial"}
        className="flex flex-col items-end w-full overflow-hidden"
      >
        <div className="w-full flex items-start flex-col h-full">
          {resourcesArray &&
            resourcesArray.map((links, index) => (
              <a
                key={index}
                href={links}
                className={`dropbtn bg-neutral-900 flex justify-start pl-[26%] border-b border-neutral-800 w-full p-1`}
              >
                Image{index+1}
              </a>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dropdown;
