import React from "react";
import Image from "next/image";
import htmllogo from "@/public/html-5.png";
import csslogo from "@/public/css-3.png";
import jslogo from "@/public/js.png"
import closeburgmenu from "@/public/burgermenu.png";
interface tagtypes {
  open :()=>void
  tagArray :[string]|undefined
  difficulty :string|undefined
}
const Tagbar:React.FC<tagtypes>=({open,tagArray,difficulty})=> {


  const handeltagcolor = (color: string) => {
    if (color === "easy") return "#22c55e";
    else if (color === "medium") return "#facc15";
    else if (color ==="hard") return "#dc2626";


  };
   
  const handelImageSrc = (tags: string) => {
    if (tags === "html") return htmllogo;
    else if (tags === "css") return csslogo;
    else if (tags == "js") return jslogo;

    return ""
  };
  
  return (
    <>
      <div className="tagbar relative w-full pl-3 p-2 gap-5  bg-neutral-800 flex justify-start items-center h-[5%]">
       {
        tagArray&& tagArray.length>0 && tagArray.map((tags,index)=>(
          <div key={index} className="flex items-center gap-1">
          <Image src={handelImageSrc(tags)} className="w-[1.2rem]" alt="" />
          <span className="text-[0.9rem] text-neutral-300">{tags.toUpperCase()}</span>
        </div>
        ))
       }
  
        <div className="flex items-center gap-1">
          <span style={{color:handeltagcolor(difficulty!)}} className="text-[0.9rem] p-[0.2rem] border border-neutral-700 rounded-md">{difficulty}</span>
        </div>

        <button onClick={open}   className="right-0 absolute hidden max-sm:block ">
        <Image src={closeburgmenu} alt="" className="w-[2rem]  " />
        </button>
      </div>
    </>
  );
}

export default Tagbar;
