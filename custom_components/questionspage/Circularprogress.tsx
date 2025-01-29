"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circularprogress: React.FC<{ progress: number }> = ({ progress }) => {
  const percentage = progress;
  let color ="yellow"
  const handelColorChange=()=>{
    if(progress <= 50)
     color ="#ef4444"
    else if(progress<=70)
      color ="#eab308"
    else if(progress<= 100)
      color= "#22c55e"
  }
  handelColorChange()
  return (
    <>
 
        <CircularProgressbar
          styles={{
            path: {
              // Path (progress bar) color
              stroke: color,
            },
            trail: {
              // Trail (background) color
              stroke: "#d4d4d4",
            },
            text: {
              // Text color
              fill: color,
              fontSize: "16px",
            },
          }}
          value={percentage}
          text={`${percentage}%`}
        />
    
    </>
  );
};

export default Circularprogress;
