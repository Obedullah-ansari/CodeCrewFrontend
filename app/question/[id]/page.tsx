"use client";
import Circularprogress from "@/custom_components/questionspage/Circularprogress";
import Progressbar from "@/custom_components/questionspage/Progressbar";
import Tag from "@/custom_components/questionspage/Tagbar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import questionsdetails from "../questionsdetails";
import performaUpadte from "../performaceUpadte";
import { useParams } from "next/navigation";
import Image from "next/image";
import cross from "@/public/close.png"

interface questionInfotype {
  problemid: string;
  credits: number;
  projectname: string;
  problemtags: [string];
  problemdifficulty: string;
  problemmainstatement: string;
  problemsubstatement: string;
  problemimage: string | undefined;
  multipletask: [
    {
      _id: string;
      task: string;
      completed: string;
    }
  ];

  overallperformace: number;
}

interface taskArrayNewPerformance {
  taskId: string;
  complete: string;
  performance: number;
}

const Question: React.FC<{}> = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || "";

  const [questionDetails, setQuestionDetails] = useState<questionInfotype>();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [taskArray, setTaskArray] = useState<number[]>([1]);
  const [userPerformance, setUserPerfomace] = useState<number>(0);
  const [perfomaceArray, setPerfomaceArray] = useState<
    taskArrayNewPerformance[]
  >([
    {
      taskId: "",
      complete: "",
      performance: 0,
    },
  ]);

  useEffect(() => {
    if (questionDetails?.problemid || questionDetails?.projectname) {
      localStorage.setItem("problemid", questionDetails.problemid);
      localStorage.setItem("projectname", questionDetails.projectname);
      localStorage.setItem("projectTags", JSON.stringify(questionDetails.problemtags));
    }
  }, [questionDetails]);


  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  });

  useEffect(() => {
    const handelQuestionDetails = async (id: string) => {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/problems/getproblembyid/${id}`;
      const response = await questionsdetails(URL);
      if (response && response.problemInfo) {
        setQuestionDetails(response.problemInfo);
      }
    };
    handelQuestionDetails(id);
  }, []);

  useEffect(() => {
    localStorage.setItem("hasVisited", "false");
     localStorage.removeItem("airesponse");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const handelPerformanceDetails = async () => {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/userperformace/auserperformace/${id}`;
      const response = await performaUpadte({ URL, token });
      if (response) {
        setPerfomaceArray(response);
      }
    };
    handelPerformanceDetails();
  }, [id]);

  useEffect(() => {
    if (perfomaceArray) {
      let completedTasks = [1],
        sum = 0,
        len = 0;
      for (let i = 1; i < perfomaceArray.length; i++) {
        if (perfomaceArray[i - 1].complete.trim() === "complete") {
          completedTasks.push(1);
        } else completedTasks.push(0);
      }
      setTaskArray(completedTasks||0);

      for (let i = 0; i < perfomaceArray.length; i++) {
        if (perfomaceArray[i].complete.trim() === "complete") len += 1;
        sum = sum + perfomaceArray[i].performance;
      }

      sum = sum / len;
      const fixedNum = parseFloat(sum.toFixed(2));
      setUserPerfomace(fixedNum||0);
    }
  }, [perfomaceArray]);

  let image = null;
  if (questionDetails?.problemimage) {
    image = `${process.env.NEXT_PUBLIC_API_URL}${questionDetails.problemimage}`;
  
  }

  return (
    <>
      <section className="relative  w-full flex  h-[100vh] ">
        <div className=" w-[65%] p-2  max-sm:w-full   h-full rounded-lg">
          <div className="h-full w-full  border-neutral-900  rounded-lg overflow-hidden">
            <Tag
              open={() => setSideBarOpen((prev) => !prev)}
              tagArray={questionDetails?.problemtags}
              difficulty={questionDetails?.problemdifficulty}
            />
            <div className="lg:h-full max-sm:h-auto md:h-auto sm:h-auto  w-full bg-neutral-950">
              <div className="questionstatement p-2 max-sm:h-[40%]  flex flex-col  gap-5  w-full h-[35%]">
                <p className="text-[1.1rem] max-sm:text-[1rem]">
                  {questionDetails?.problemmainstatement}
                </p>
                <span className="text-justify max-sm:text-[0.9rem] ">
                  {questionDetails?.problemsubstatement}
                </span>
              </div>
              <div className="progressbar max-sm:h-[55%] flex-shrink-0  pt-6 gap-3 p-2 border-t border-neutral-700 w-full h-[60%] overflow-auto">
                {questionDetails &&
                  questionDetails.multipletask.length > 0 &&
                  questionDetails.multipletask.map((task, index) => (
                    <Progressbar
                      key={index}
                      userArray={perfomaceArray[index]}
                      ristrict={taskArray[index]}
                      text={task.task}
                      complete={task.completed}
                      id={task._id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

       

        <motion.div
          className="sidebar max-sm:w-full    max-sm:absolute  border-l border-neutral-700  w-[35%] h-full"
          initial={sideBarOpen ? { y: "-100%" } : { y: "0%" }}
          animate={
            isSmallScreen && sideBarOpen
              ? { y: "-100%", transition: { duration: 0.3 } }
              : { y: "0%", transition: { duration: 0.3 } }
          }
        >
          <div className="bg-neutral-950  rounded-lg h-full w-full">
            <div className="relative bg-neutral-800 max-sm:block hidden w-full h-[3%]">
              <button
                className="absolute right-1 top-1 "
                onClick={() => setSideBarOpen((prev) => !prev)}
              >
                 <Image src={cross} alt="" className="w-[1rem]   " />
              </button>
            </div>
            <div className="h-[50%] max-sm:h-[48%] overflow-hidden  w-full p-2 ">
              {image && (
                <Image
                  className="w-full h-full rounded-md object-cover"
                  src={image}
                  alt=""
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="max-sm:h-[47%] h-[49%] mr-2 ml-2  rounded-lg   p-2  bg-neutral-900 ">
              <div className="h-full w-full bg-neutral-900 rounded-lg">
                <div className="w-full h-[10%] text-center">
                  <h1 className="text-[1.3rem]">Rewards</h1>
                </div>
                <div className="h-[20%] text-center">
                  <p>{questionDetails?.credits}</p>
                  <span>earning point will help to win badges</span>
                </div>
                <div className="h-[70%] flex  gap-2 flex-col justify-center items-center  w-full">
                  <span className="text-[1.1rem]  inline-block h-[10%] text-neutral-300">
                    over all performance
                  </span>
                  <div className="w-[10rem] ">
                    <Circularprogress progress={userPerformance} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Question;
