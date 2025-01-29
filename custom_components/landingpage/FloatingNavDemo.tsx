"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, CircleEllipsis, CircleUser} from "lucide-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/#home",
      icon: <Home style={{color:"#FF7F50"}}/>
    },
    {
      name: "About",
      link: "/#more",
      icon: <CircleEllipsis style={{color:"#FF7F50"}}/>
    },
    {
      name: "Support",
      link: "/#contact",
      icon: <CircleUser style={{color:"#FF7F50"}}/>
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

