"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const  Userprogress:React.FC<{name :string, pgr :number}> =({name,pgr})=> {
    let color = "green";
    function setColor(name:string) {
      if (name === "html") color = "#fb923c";
      else if (name === "css") color = "#3b82f6";
      else if (name === "js") color = "#fde047";
      else if (name === "react") color = "#22d3ee "
      else if (name === "tailwind") color = "#c084fc "
    }
    setColor(name);
  return (
    <>
    <div className="max-sm:w-[95%] sm:w-[95%] sm:h-[10rem] max-sm:h-[70%] lg:w-[13rem]   rounded-md bg-neutral-900 lg:h-[7rem] flex  ">
        <div  className="w-[50%]   flex justify-center items-center h-full">
          <h1 style={{color}} className={` max-sm:text-[1.3rem] text-[1rem]  `}>{name.toUpperCase()}</h1>
        </div>
      <div className="lg:w-[50%] max-sm:w-[35%] sm:w-[40%] sm:p-8 flex  justify-center items-center lg:p-3 h-full">
      <CircularProgressbar
          styles={{
            path: {
              // Path (progress bar) color
              stroke: color,
            },
            trail: {
              // Trail (background) color
              stroke: "#737373",
            },
            text: {
              // Text color
              fill: color,
              fontSize: "20px",
            },
          }}
          value={pgr}
          text={`${pgr}%`}
        />
      </div>
    </div>
    
    </>
  )
}

export default Userprogress;
