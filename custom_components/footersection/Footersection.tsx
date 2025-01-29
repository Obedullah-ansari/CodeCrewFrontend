import React from "react";
import Image from "next/image";
import logo from "@/public/hexagon.png";
function Footersection() {
  return (
    <>
      <section className="w-full bg-neutral-950 h-auto overflow-hidden">
        <div className="relative  w-full border-t-2 border-neutral-800 justify-center items-center pt-[5%] flex max-sm:flex-col max-sm:h-full h-[40vh]">
          <div className="bgtext flex  justify-center  items-center w-full z-0 h-full  absolute top-0">
            <span className="lg:text-[10rem]  sm:text-[8rem]  max-sm:text-[3rem]  text-transparent bg-clip-text  bg-gradient-to-t from-orange-500 to-neutral-100  font-extrabold">
              Code 
            </span>
            <span className="lg:text-[10rem]  sm:text-[8rem] max-sm:text-[3rem]  text-transparent bg-clip-text  bg-gradient-to-t from-orange-500 to-neutral-100  font-extrabold">
              crew
            </span>
           
          </div>

          <div className=" flex  max-sm:w-full justify-center items-start  pt-8 w-[30%] h-full">
            <div className="flex justify-center max-sm:justify-start max-sm:w-full max-sm:p-3 items-center max-sm:pb-3 gap-3 pt-3">
              <Image className="w-[5rem] max-sm:w-[2rem]" src={logo} alt="" />
              <span className=" max-sm:text-[1rem] md:text-[1.5rem] lg:text-[2.2rem] ">
                CodeCrew
              </span>
            </div>
          </div>
          <div className=" w-[70%] max-sm:w-full max-sm:flex-col flex  justify-end items-center h-full">
            <div className="flex pt-3 max-sm:pt-0 b max-sm:w-full flex-col text-neutral-200 gap-4  h-full w-[30%] max-sm:items-start p-3    justify-start items-start">
              <span>Linkeden</span>
              <span>Git hub</span>
              <span>More of my works</span>
              <span>share</span>
            </div>
            <div className="flex pt-3 max-sm:pt-0 flex-col max-sm:w-full text-neutral-200 p-3 gap-4 h-full w-[30%] max-sm:items-start justify-start items-start">
              <span>support</span>
              <span>query</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footersection;
