import React, { useState } from "react";
import { motion } from "framer-motion";
import moreoption from "@/public/more.png";
import mobile from "@/public/mobile.png";
import tab from "@/public/tab.png";
import mac from "@/public/imac.png";
import Image from "next/image";
import close from "@/public/close.png"

interface Risponsiveliveserver {
  mobile: boolean;
  tab: boolean;
  mac: boolean;
}

const Liveserver: React.FC<{
  viewLive: () => string;
  serverOn: () => void;
}> = ({ viewLive, serverOn }) => {
  const [risponsiveBar, setRisponsiveBar] = useState<boolean>(false);
  const [risponsiveLiveServer, setRisponsiveLiveServer] =
    useState<Risponsiveliveserver>({
      mobile: false,
      tab: false,
      mac: false,
    });

  const handleDeviceChange = (device: keyof Risponsiveliveserver) => {
    setRisponsiveLiveServer({
      mobile: false,
      tab: false,
      mac: false,
      [device]: true, // Set the selected device to true
    });
  };

  return (
    <>
      <div className="h-[100vh] overflow-hidden absolute z-[100] p-2 bg-neutral-900 w-full">
        <div className="w-full h-full rounded-md overflow-hidden">
          <div className="topbarlive max-sm:gap-[35%]   sm:gap-[40%] md:gap-[44%] lg:gap-[46%] bg-neutral-700 flex justify-start pl-2 items-center h-[2%] w-full">
            <button onClick={serverOn}>
            <Image className="w-[0.9rem]" src={close} alt="open" />
            </button>
            <div className="cursor-pointer flex justify-center items-center relative">
              <button onClick={() => setRisponsiveBar((prev) => !prev)}>
                <Image src={moreoption} alt="" className="w-[1.7rem]" />
              </button>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={
                  risponsiveBar
                    ? { opacity: 1, y: 0, transition: { duration: 0.2 } }
                    : { opacity: 0, y: -10, transition: { duration: 0.2 } }
                }
                className="menubar backdrop-blur-[2px] w-[15rem] h-[5rem] gap-7 flex justify-center items-center rounded-lg absolute top-full"
              >
                <button
                  className="p-1 rounded-md"
                  onClick={() => handleDeviceChange("mobile")}
                >
                  <Image src={mobile} alt="" className="w-[1.7rem]" />
                </button>
                <button
                  className="p-1 rounded-md"
                  onClick={() => handleDeviceChange("tab")}
                >
                  <Image src={tab} alt="" className="w-[1.7rem]" />
                </button>
                <button
                  className="p-1 rounded-md"
                  onClick={() => handleDeviceChange("mac")}
                >
                  <Image src={mac} alt="" className="w-[1.7rem]" />
                </button>
              </motion.div>
            </div>
          </div>
          <div className="h-full w-full flex justify-center items-center">
            <motion.div
              initial={{ width: "100%" }}
              animate={{
                width: risponsiveLiveServer.mobile
                  ? "375px" // Mobile width
                  : risponsiveLiveServer.tab
                  ? "768px" // Tablet width
                  : risponsiveLiveServer.mac
                  ? "100%" // Mac width
                  : "100%", // Default width (full)
                transition: { duration: 0.3 },
              }}
              className="parent w-full bg-contain h-full"
            >
              <iframe
                src="editor.html" 
                srcDoc={viewLive()}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  border: "none",
                }}
                sandbox="allow-scripts allow-same-origin allow-top-navigation"
                title="Live Preview"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Liveserver;
