import React, { useState } from "react";
import Image from "next/image";
import arrow from "@/public/right-chevron.png";

const Progressbar: React.FC<{
  id:string;
  text: string;
  complete: string;
  ristrict: number;
  userArray :{
    taskId: string;
    complete: string;
    performance: number;
  }
 
}> = ({ ristrict, text, complete,id ,userArray}) => {
  const [loading, setShowLoading] = useState<boolean>(false);

  const handleColor = () => {
    if (complete.trim() === "pending") return "#ef4444";
    else return "#22c55e";
  };

  const url = `/editor/${id}`
  if(ristrict ===1 && userArray.complete.trim()==="complete" ){
    complete = "completed"
  }

  const handelLoading = () => {
    setShowLoading(true); 
  
    const timeoutId = setTimeout(() => {
      setShowLoading(false); 
    }, 3000);
  
    return () => clearTimeout(timeoutId); 
  };
 


  return (
    <>
      <div className="relative max-sm:h-auto w-full  mb-3  sm:md-[5rem] lg:h-[5rem] rounded-md sm:h-auto  p-1 flex justify-start gap-3 items-center bg-neutral-800">
        <div className="flex gap-2 w-[73%] items-center h-full">
          <Image src={arrow} className="w-[1rem]" alt="" />
          <span className="max-sm:text-[0.9rem]">{text}</span>
        </div>

        <div className="flex w-auto  h-full  items-center gap-2 ">
          <span
            style={{ color: handleColor() }}
            className=" max-sm:text-[0.85rem]  p-1 rounded-md"
          >
            {complete}
          </span>
          {loading ? (
            <span>loading...</span>
          ) : (
            <a
              onClick={handelLoading}
              href={url}
              className="p-1 max-sm:text-[0.85rem] text-neutral-300  border border-neutral-700 rounded-md"
            >
              code
            </a>
          )}
        </div>
        { !ristrict  && (
          <div className="ristricteddiv absolute top-0 left-0  w-full h-full rounded-md"></div>
        )}
      </div>
    </>
  );
};

export default Progressbar;
