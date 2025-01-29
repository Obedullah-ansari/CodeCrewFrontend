"use client";
import Userprogress from "@/custom_components/user/Userprogress";
import UserSideNav from "@/custom_components/user/UserSideNav";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import userPerformanceData from "./userPerformance";
import Image from "next/image";
import burgermenu from "@/public/burgermenu.png";
import { Provider } from "react-redux";
import store from "@/redux/store";



interface Task {
  taskId: string;
  complete: string;
  performance: number;
  _id: string;
}

interface MultipleTask {
  problemid: string;
  task: Task[];
  _id: string;
}

interface Progress {
  languagename: string;
  languageprogress: number;
  _id: string;
}

interface PerformanceData {
  userimage: string;
  _id: string;
  userid: string;
  badges: string[];
  totalprojectdone: number;
  easy: number;
  medium: number;
  hard: number;
  multipletask: MultipleTask[];
  Progress: Progress[];
  useremail: string;
  username: string;
  currentlyworking: string;
  credits: number;
  nextbadgecredit: number;
}

function UserDashBoard() {
  const [userImageUpdate, setUserImageUpdate] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userPerformance, setUserPerformance] = useState<
    PerformanceData | undefined
  >();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/userperformace/getallperformance`;
    const handelUserPerformanceData = async () => {
      const userdata = await userPerformanceData({ URL, token });
      if (userdata) {
        setUserPerformance(userdata);
      }
    };
    handelUserPerformanceData();
  }, [userImageUpdate]);


  const mark = userPerformance?.nextbadgecredit
    ? Number(userPerformance?.nextbadgecredit) -
      Number(userPerformance?.credits)
    : 0;
  return (
    <>
      <Provider store={store}>
        <div className="rightdiv relative w-full h-[100vh] flex justify-center items-center">
          <motion.div
            initial={sideBarOpen ? { x: "-100%" } : { x: "0%" }}
            animate={
              isSmallScreen && sideBarOpen
                ? { x: "-100%", transition: { duration: 0.3 } }
                : { x: "0%", transition: { duration: 0.3 } }
            }
            className="h-full max-sm:absolute z-[100]  max-sm:w-full sm:w-[45%] lg:w-[30%]"
          >
            <UserSideNav
              update={() => setUserImageUpdate((prev) => !prev)}
              userimage={userPerformance?.userimage}
              useremail={userPerformance?.useremail}
              username={userPerformance?.username}
              totalproj={userPerformance?.totalprojectdone.toString()}
              currentproj={userPerformance?.currentlyworking}
              opennav={() => setSideBarOpen((prev) => !prev)}
            />
          </motion.div>

          <div className="leftdiv  max-sm:relative max-sm:w-full  h-full sm:w-[55%] lg:w-[70%]">
            <div className="hidden max-sm:block h-[5%]">
              <motion.button
                whileTap={{
                  rotate: 20,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                className="absolute  p-2"
                onClick={() => setSideBarOpen((prev) => !prev)}
              >
                <Image src={burgermenu} alt="" className="w-[2rem]" />
              </motion.button>
            </div>
            <div className="learning w-full max-sm:justify-center max-sm:pr-2 max-sm:pl-3 pl-5  max-sm:flex-col max-sm:h-[40%]  max-sm:items-center flex flex-wrap  gap-3 h-[50%]  overflow-auto ">
              <div className="w-full max-sm:absolute  top-0 max-sm:w-[60%] flex justify-center items-center  max-sm:text-[1.5rem] sm:text-[1.2rem] lg:text-[2rem]">
                {" "}
                <h1>Track you progress</h1>
              </div>
              {userPerformance &&
                userPerformance.Progress.map((userData, index) => (
                  <Userprogress
                    key={index}
                    name={userData.languagename}
                    pgr={userData.languageprogress}
                  />
                ))}
            </div>
            <div className="max-sm:h-auto border-t border-neutral-700 h-[50%]  w-full">
              <div className="  w-full h-full  flex max-sm:flex-col ">
                <div className="sm:w-[50%] lg:w-[35%] h-full max-sm:h-[50%] p-[2%] border-r   border-neutral-700 flex flex-col items-center gap-7 ">
                  <span className="p-[2%] md:text-[1rem] inline-block w-full text-center  lg:text-[1.2rem] text-neutral-200">
                    projects Done By Difficulty
                    <div className="w-[95%] h-[2px] rounded-full bg-neutral-400"></div>
                  </span>
                  <div className="w-full flex justify-between items-center  ">
                    <span className="text-green-500">Easy</span>{" "}
                    <span>{userPerformance?.easy}</span>
                  </div>
                  <div className="w-full flex justify-between items-center ">
                    <span className="text-yellow-500">Medium</span>{" "}
                    <span>{userPerformance?.medium}</span>
                  </div>
                  <div className="w-full flex justify-between items-center ">
                    <span className="text-red-500">Hard</span>{" "}
                    <span>{userPerformance?.hard}</span>
                  </div>
                </div>
                <div className="sm:w-[50%]  lg:w-[65%]  max-sm:h-[50%] h-full flex flex-col justify-start items-center ">
                  <span className="text-[1.2rem] text-center w-full inline-block bg-neutral-800 p-3">
                    Your badges
                  </span>
                  <div className="w-full p-[1rem] flex flex-col justify-center items-center">
                    <span className="p-2">
                      Need {mark} more credits to get nextbadge{" "}
                    </span>

                    <progress
                      value={
                        userPerformance?.credits != null
                          ? Number(userPerformance?.credits)
                          : 0
                      }
                      max={
                        userPerformance?.nextbadgecredit != null
                          ? Number(userPerformance?.nextbadgecredit)
                          : 100
                      }
                      className="w-[95%] h-[10px]"
                    />
                  </div>
                  <div className="w-full flex  p-1 flex-nowrap ">
                    {userPerformance?.badges &&
                      userPerformance.badges.map((badge, index) => (
                        <Image
                          key={index}
                          src={`${process.env.NEXT_PUBLIC_API_URL}${badge}`}
                          alt=""
                          width={200}
                          height={100}
                          className="w-[4rem] m-4"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default UserDashBoard;
