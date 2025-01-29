"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";


export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem]  rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />
    </div>
  );
}

const testimonials = [
    {
      quote: "Learning to code is not about memorizing syntax, but about building the future one line at a time.",
      name: "Andrew",
      title: "Tech Enthusiast",
      image:
        "https://images.pexels.com/photos/940585/pexels-photo-940585.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      quote: "Progress isn't just about writing code it's about solving problems and developing skills that last a lifetime.",
      name: "John Doe",
      title: "Senior devloper",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      quote: "Progress in coding isn't just about completing tasks—it's about mastering new skills that will empower you to tackle bigger challenges. With CodeCrew, you can track every achievement and grow with every project.",
      name: "Marcus",
      title: "Code Mentor",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      quote: "The road to becoming a confident developer is built on continuous learning and hands-on experience. CodeCrew provides the perfect platform to hone your skills and build projects that make you proud.",
      name: "Jane ",
      title: "Devloper",
      image:
        "https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      quote: "Every project you create is a step forward in your journey as a developer. With CodeCrew, you can download your work, track your progress, and always stay on top of your learning path.",
      name: "Mark Dev",
      title: "Python devloper",
      image:
        "https://images.pexels.com/photos/709188/pexels-photo-709188.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  
];
