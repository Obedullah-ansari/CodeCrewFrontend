import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

export function FlipWordsDemo() {
  const words = ["Start small", "Learn together", "Build big"];

  return (
    <div className="max-sm:h-[10rem] md:h-[26rem] lg:h-[30rem] flex w-full justify-center items-center overflow-hidden">
      <div className="lg:font-bold lg:text-[4rem] flex justify-center items-center flex-col m-0 p-0 md:text-[2.3rem] sm:text-[1.3rem]   max-sm:text-[1.3rem] sm:font-normal text-neutral-600 dark:text-neutral-400">
        <div className="text-gray-300 p-0  text-center w-full">
         CodeCrew where you
        </div>
        <FlipWords words={words} /> 
        <p className="max-sm:text-[0.9rem] sm:text-[0.9rem] lg:text-[1.1rem] font-normal text-gray-300">CodeCrew helps you master web development with beginner friendly project based learning from zero to hero</p>
        <Link href="/projects" className="p-1 m-1 max-sm:w-[20%] hover:bg-[#FF7F50] text-white w-[10%] text-[1rem] border border-[#FF7F50] rounded-md">lets go</Link>
      </div>
    </div>
  );
}
