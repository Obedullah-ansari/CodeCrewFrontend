"use client";
import Sidesearchnav from "@/custom_components/projectpage/Sidesearchnav";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlareCard from "@/custom_components/cards/GlareCard";
import projectsdetails from "@/app/projects/projectsdetails";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Image from "next/image";
import searclogo from "@/public/search.png";
import closeburgmenu from "@/public/menu.png";
import cross from "@/public/close (1).png"
interface projectcarddetails {
  _id: string;
  projectTitle: string;
  projectTags: [string];
  difficulty: string;
  credits: number;
  active: string;
  projectdescription: string;
}

function Searchprojects() {
  const [cardDetails, setCardDetails] = useState<projectcarddetails[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  //card details fetching
  useEffect(() => {
    const handelProjectCradsDetails = async () => {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/projects/allprojectinfo`;
      const response = await projectsdetails(URL);
      if (response && response.projects) {
        setCardDetails(response.projects);
      }
    };
    handelProjectCradsDetails();
  }, []);

  // Handle search button click
  const handleSearch = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/projects/searchprojects?tag=${searchQuery}`;

    const response = await projectsdetails(URL);
    if (response && response.data) {
      setCardDetails(response.data);
    }
  };

  //small screen nav bar handling logic

  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  });

  return (
    <Provider store={store}>
      <section className="relative h-[100vh]  flex flex-col justify-center items-center w-full overflow-hidden">
        <div className="flex justify-center items-center w-full h-[12%] ">
          <div className="relative border-b-[2px] border-neutral-900 w-full h-full flex justify-center items-center">
            <button
              className="text-[1.2rem] left-0 absolute top-0 hidden max-sm:block"
              onClick={() => setSideBarOpen((prev) => !prev)}
            >
               <Image src={closeburgmenu} alt="" className="w-[2rem] m-1 " />
            </button>
            <h1 className="text-[2rem] max-sm:text-[1.2rem] max-sm:pl-3">
              Learn, Build, and Love Every Step
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="h-[88%] flex w-full">
          {/* Sidebar */}
          <motion.div
            initial={sideBarOpen ? { x: "-100%" } : { x: "0%" }}
            animate={
              isSmallScreen && sideBarOpen
                ? { x: "-100%", transition: { duration: 0.3 } }
                : { x: "0%", transition: { duration: 0.3 } }
            }
            className="sidesearchnav z-[1000] max-sm:bg-transparent max-sm:backdrop-blur-[2rem] h-full max-sm:w-[90%]  max-sm:absolute max-sm:top-0   sm:w-[30%] md:w-[27%] lg:w-[23%]"
          >
            <div className="w-full  flex flex-col justify-center p-2 items-end h-[12%]">
              <button
                className=" max-sm:block hidden"
                onClick={() => setSideBarOpen((prev) => !prev)}
              >
                <Image src={cross} alt="" className="w-[1.4rem] bg-white rounded-lg m-2 " />
              </button>

              <div className="flex h-[70%]  rounded-md border border-neutral-800 items-center justify-center w-[85%] max-sm:[90%]">
                <button className="p-2" onClick={handleSearch}>
                  <Image src={searclogo} alt="" className="w-[2rem]" />
                </button>
                <input
                  type="text"
                  placeholder="search.."
                  className="p-2 w-full h-[50%] max-sm:h-full bg-transparent"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full h-full">
              <Sidesearchnav setCardDetails={setCardDetails} />
            </div>
          </motion.div>

          {/* Cards Section */}
          <div className="cards flex flex-col   h-full max-sm:w-full sm:w-[70%] md:w-[73%] lg:w-[77%] ">
            <div className="h-full max-sm:h-[70%] w-full  flex flex-wrap  max-sm:items-center max-sm:pl-0 pl-[3%] pt-[1%] overflow-auto max-sm:flex-col ">
              {cardDetails.length > 0 &&
                cardDetails.map((cardinfo, index) => (
                  <GlareCard
                    key={index}
                    id={cardinfo._id}
                    projectTitle={cardinfo.projectTitle}
                    projectTags={cardinfo.projectTags}
                    difficulty={cardinfo.difficulty}
                    projectdescription={cardinfo.projectdescription}
                    active={cardinfo.active}
                  />
                ))}
            </div>
            <div className="h-[30%] items-start max-sm:flex justify-center hidden  w-full ">
              <h1>swap left</h1>
            </div>
          </div>
        </div>
      </section>
    </Provider>
  );
}

export default Searchprojects;
