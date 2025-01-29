"use client";
import React, { useState } from "react";
import tick from "@/public/check.png";
import Image from "next/image";

interface TickProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const Tick: React.FC<TickProps> = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="tick w-full rounded-md h-[3rem] max-sm:bg-neutral-950 bg-neutral-900 flex gap-2 p-2 items-center"
    >
      <div
        className={`w-4 h-4 border border-gray-200 rounded-sm ${
          active ? "bg-white" : "bg-transparent"
        }`}
      >
        {active && <Image src={tick} alt="" className="w-full" />}
      </div>

      <span>{text}</span>
    </button>
  );
};

export default Tick;
