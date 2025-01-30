import React from "react";
import Image from "next/image";
import close from "@/public/close.png";
// import hint from "@/public/solution.png";
// import codeformat from "@/public/div.png";
// import savecode from "@/public/save.png";
import { Code,SaveAll ,Lightbulb} from "lucide-react";
import submitcode from "@/public/rotate.png";

const DemoInstructions: React.FC<{
  image: string | undefined;
  democlose: () => void;
}> = ({ image, democlose }) => {
  const isVideo = image?.endsWith(".mov") || image?.endsWith(".mp4") || image?.endsWith(".webm");

  return (
    <>
      <div className="demodivclass w-full h-full flex max-sm:flex-col absolute z-[100]">
        {/* Instructions Section */}
        <div className="relative w-[40%] h-full max-sm:h-[50%] max-sm:w-full p-[2%] flex flex-col text-neutral-400 bg-neutral-900 justify-start pt-[5%] lg:text-[1.1rem] items-center gap-3">
          <span className="text-[2rem]">Basic Instructions</span>
          <span>
            <span className="text-yellow-500 text-[1.3rem]">Save Your Progress:</span> Save your code for future reference by clicking the Save button 
            <SaveAll style={{display: "inline"  }}/>
          </span>
          <span>
            <span className="text-yellow-500 text-[1.3rem]">Need Help?:</span> If you're stuck, you can view hints or solutions by clicking the 
            <Lightbulb style={{display: "inline"}} />
          </span>
          <span>
            <span className="text-yellow-500 text-[1.3rem]">Format Code:</span> Quickly format your code by clicking the Code Format button 
            <Code style={{display: "inline" }} /> or using the shortcut Ctrl or Cmd + Shift + P.
          </span>
          <span>
            <span className="text-yellow-500 text-[1.3rem]">Submit Code:</span> 
            <Image className="w-[1.7rem] p-1 inline" src={submitcode} alt="Submit" /> Once you've completed coding, submit your solution to receive a performance percentage. Submission is required to proceed to the next task.
          </span>
          <button className="absolute top-0 right-0 max-sm:block hidden" onClick={democlose}>
            <Image className="w-[1.5rem] p-1" src={close} alt="Close" />
          </button>
        </div>

        {/* Preview Section */}
        <div className="relative w-[60%] max-sm:h-[50%] max-sm:w-full h-full bg-cover flex flex-col justify-center items-center gap-3 p-2">
          <button className="absolute top-0 right-0 max-sm:hidden" onClick={democlose}>
            <Image className="w-[1.9rem] p-1" src={close} alt="Close" />
          </button>
          <span className="text-[1.2rem] p-2 text-yellow-500">What you are building in this task</span>
          {isVideo ? (
            <video
              className="rounded-md"
              width="100%"
              height="auto"
              controls
            >
              <source src={image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={image} className="rounded-md" alt="Preview" />
          )}
        </div>
      </div>
    </>
  );
};

export default DemoInstructions;
