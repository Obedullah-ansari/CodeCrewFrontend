"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 ">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Step by Step Learning",
    description:
      "Start your journey with structured, step by step learning paths. Ask AI for help when you get stuck, track your progress, and save your work for future reference.",
  },
  {
    title: "AI Powered Assistance",
    description:
      "Get instant help from AI whenever you face a challenge. AI offers personalized assistance to guide you through your learning journey and provide standard solutions to your questions.",
  },
  {
    title: "Expert Solutions",
    description:
      "Access the standard solutions to common problems and questions in your learning field. Build a strong foundation by understanding the best practices and solutions.",
  },
  {
    title: "Save Your Journey",
    description:
      "Track your learning journey and save your progress with ease. Never lose track of your accomplishments and revisit completed lessons or projects at any time.",
  },
  {
    title: "Track Progress Easily",
    description:
      "Monitor your progress through a clear and detailed dashboard. Visualize your growth and improvement as you complete lessons, projects, and challenges.",
  },
  {
    title: "Download Your Work",
    description:
      "Easily download your completed projects and code files. Keep your work handy for offline access, future improvements, or sharing with others.",
  },
];
