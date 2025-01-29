"use client";
import React, { useState } from "react";


interface TickProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const Difftick: React.FC<TickProps> = ({ text, active, onClick }) => {
     
    

  return (
    <button
      onClick={onClick}
      className="tick w-full rounded-md h-[3rem] max-sm:bg-neutral-950 bg-neutral-900 flex gap-2 p-2 items-center"
    >
      <div
        className={`w-4 h-4 border border-gray-200 rounded-full ${
          active ? "bg-white" : "bg-transparent"
        }`}
      >
    
      </div>

      <span>{text}</span>
    </button>
  );
};

export default Difftick;
