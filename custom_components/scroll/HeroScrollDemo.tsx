"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FlipWordsDemo } from "../landingpage/FlipWordsDemo";
import { ImagesSliderDemo } from "./ImagesSliderDemo";


export function HeroScrollDemo() {
  return (
    <div className="flex flex-col h-auto overflow-hidden w-full">
      <ContainerScroll
        titleComponent={
          <>
            <FlipWordsDemo />
          </>
        }
      >
       <ImagesSliderDemo/>
      </ContainerScroll>
    </div>
  );
}
