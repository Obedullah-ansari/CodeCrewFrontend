"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import mainone from "@/public/mainfive.png"
import maintwo from "@/public/main7.png"
import mainthree from "@/public/mainthree.png"
import mainthfour from "@/public/mainsix.png"

export function ImagesSliderDemo() {
    const images = [mainone, maintwo, mainthree,mainthfour].map((image) => image.src);
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center rounded-md overflow-hidden"
      >
       
       
      </motion.div>
    </ImagesSlider>
  );
}
