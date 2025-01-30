"use client";
import React from "react";
import { GlareCardBody } from "@/components/ui/glare-card";
import Image from "next/image";
import htmllogo from "@/public/html-5.png";
import csslogo from "@/public/css-3.png";
import jslogo from "@/public/js.png";
import Link from "next/link";
import { useDispatch } from "react-redux";


const GlareCard: React.FC<{
  id: string;
  projectTitle: string;
  projectTags: [string];
  difficulty: string;
  active: string;
  projectdescription: string;
}> = ({
  id,
  projectTitle,
  projectTags,
  difficulty,
  active,
  projectdescription,
}) => {
  const handelImageSrc = (tags: string) => {
    if (tags === "html") return htmllogo;
    else if (tags === "css") return csslogo;
    else if (tags === "js") return jslogo;
  };
  const handeltagcolor = (color: string) => {
    if (color === "easy") return "#22c55e";
    else if (color === "medium") return "#facc15";
    else if (color == "hard") return "#dc2626";
  };

  const dispatch = useDispatch();
  const handelQuestionId = () => {
    dispatch({ type: "questionid", payload: id });
  };
  let url;
  if (active.trim() === "active") {
    url = `/question/${id}`;
  } else {
    url = "#";
  }


  return (
    <>
      <div className="relative h-auto max-sm:flex  max-sm: justify-center  m-2 max-sm:w-full w-[20rem]  ">
        <Link
          href={url}
          onClick={handelQuestionId}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 cursor-pointer"
        >
          <GlareCardBody className="flex flex-col items-start justify-end py-8 px-6">
            <div className="w-full ">
              <div className="w-full flex pb-1 justify-start items-end gap-2">
                {projectTags.length > 0 &&
                  projectTags.map((tags, index) => (
                    <Image
                      key={index}
                      src={handelImageSrc(tags)!}
                      alt={tags}
                      className="w-[1.5rem]"
                    />
                  ))}
              </div>
              <span>
                <p className="font-bold text-white text-lg">{projectTitle}</p>
              </span>
              <span
                style={{ color: handeltagcolor(difficulty) }}
                className="border mt-1  border-neutral-700 pl-1 pr-1 text-[0.88rem] rounded-md"
              >
                {difficulty}
              </span>
            </div>
            <div className="h-[30%]">
              <p className="font-normal text-base text-neutral-200 mt-4">
                {projectdescription}
              </p>
            </div>
          </GlareCardBody>
        </Link>
        {active.trim() === "commingsoon" && (
          <span className="penddingtext text-[1.3rem] font-semibold absolute max-sm:left-28 top-5 left-5">
            Coming soon...
          </span>
        )}
      </div>
    </>
  );
};

export default GlareCard;
