import React from "react";
import Image from "next/image";
import submitcode from "@/public/rotate.png";
import chatlogo from "@/public/chat.png";
import { useEffect } from "react";
import { ZoomIn,ZoomOut,Code,File,SaveAll ,Radio , CircleHelp,Lightbulb} from "lucide-react";


interface typecheckingusestate {
  codeSavedbtn: () => void;
  codeSubmit: () => void;
  setBasicStatechange: React.Dispatch<
    React.SetStateAction<{
      width: boolean;
      liveserver: boolean;
      codeformat: boolean;
      demo: boolean;
      sol: boolean;
      ai: boolean;
    }>
  >;

  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebuttons: React.FC<typecheckingusestate> = ({
  setBasicStatechange,
  setFontSize,
  codeSavedbtn,
  codeSubmit,
}) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    // Check if 'Ctrl' or 'Command' and 'P' are pressed together
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === "p"
    ) {
      event.preventDefault();
      setBasicStatechange((prev) => ({
        ...prev,
        codeformat: !prev.codeformat,
      }));
    }
  };


  useEffect(() => {
    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div className="h-full flex z-[100] flex-col gap-6 items-center  border-r border-neutral-700 w-[4.5rem] bg-neutral-800 ">
        <button
          title="Hide side bar"
          className="w-[4.5rem] flex justify-center  bg-neutral-800 pt-2"
          onClick={() =>
            setBasicStatechange((prev) => ({ ...prev, width: !prev.width }))
          }
        >
          <File size={30} style={{color :"#a3a3a3 "}} />
        </button>
        <button
          title="live server"
          onClick={() =>
            setBasicStatechange((prev) => ({
              ...prev,
              liveserver: !prev.liveserver,
            }))
          }
        >
        <Radio size={30} style={{color :"#a3a3a3 "}}/>
        </button>
        <button
          title="Zoomin"
          className=" "
          onClick={() => setFontSize((size) => Math.min(size + 2, 30))}
        >
        <ZoomIn size={30} style={{color :"#a3a3a3 "}}/>
        </button>
        <button
          title="Zoomout"
          className=""
          onClick={() => setFontSize((size) => Math.max(size - 2, 10))}
        >
          <ZoomOut size={30} style={{color :"#a3a3a3 "}}/>
        </button>

        <button
          title="Prettier"
          onClick={() =>
            setBasicStatechange((prev) => ({
              ...prev,
              codeformat: !prev.codeformat,
            }))
          }
        >
         <Code size={30} style={{color :"#a3a3a3 "}}/>
        </button>
        <button
          title="Task Demo"
          onClick={() =>
            setBasicStatechange((prev) => ({
              ...prev,
              demo: !prev.demo,
              sol: false,
            }))
          }
        >
          <CircleHelp size={30} style={{color :"#a3a3a3 "}}/>
        </button>
        <button
          title="Hint"
          onClick={() =>
            setBasicStatechange((prev) => ({
              ...prev,
              sol: !prev.sol,
              demo: false,
            }))
          }
        >
          <Lightbulb size={30} style={{color :"#a3a3a3 "}}/>
        </button>

        <button title="save" className="rounded-sm" onClick={codeSavedbtn}>
         <SaveAll size={30} style={{color :"#a3a3a3 "}}/>
        </button>

        <button title="Run/Submit" onClick={codeSubmit}>
          <Image className="w-[2rem]" src={submitcode} alt="open" />
        </button>

        <button
          title="ask AI"
          onClick={() =>
            setBasicStatechange((prev) => ({
              ...prev,
              ai: !prev.ai,
            }))
          }
        >
          <Image className="w-[2rem]" src={chatlogo} alt="open" />
        </button>
      </div>
    </>
  );
};

export default Sidebuttons;
