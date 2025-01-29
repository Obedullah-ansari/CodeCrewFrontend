"use client";
import Dropdown from "@/custom_components/codeeditor/Dropdown";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebuttons from "@/custom_components/codeeditor/Sidebuttons";
import { useParams } from "next/navigation";
import usercodefun from "../usercodefun";
import getLanguage from "@/custom_components/codeeditor/getLanguage";
import generatePreview from "@/custom_components/codeeditor/genratePreview";
import postusercode from "../postusercodefun";
import { htmlSyntax, cssSyntax, jsSyntax } from "@/utils/syntax";
import initialCode from "../initialcode";
import initialCodePost from "../initialCodePost";
import codeSolution from "../codeSolution";
import DemoInstructions from "@/custom_components/codeeditor/DemoInstructions";
import CodeDisplay from "@/custom_components/codeeditor/CodeDisplay";
import ModalOverlay from "@/custom_components/features/ModalOverlay";
import CodeCrewGenAI from "@/custom_components/codcrewaitool/CodeCrewGenAI";
import ErrorModal from "@/custom_components/features/ErrorModal";
const MonacoEditor = dynamic(
  () => import("@/custom_components/codeeditor/MonacoEditor"),
  { ssr: false }
);
const Liveserver = dynamic(
  () => import("@/custom_components/codeeditor/Liveserver"),
  { ssr: false }
);

interface basicstateupdate {
  width: boolean;
  liveserver: boolean;
  codeformat: boolean;
  demo: boolean;
  sol: boolean;
  ai: boolean;
}
interface usercodeType {
  code: string;
  codetype: string;
}

interface codeSolutions {
  demoimage: string;
  code: [
    {
      codetype: string;
      code: string;
    }
  ];
}

const EditorWithTabs: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug || undefined;

  const [files, setFiles] = useState({
    html: htmlSyntax,
    css: cssSyntax,
    js: jsSyntax,
  });
  const [basicStatechange, setBasicStatechange] = useState<basicstateupdate>({
    width: true,
    liveserver: false,
    codeformat: false,
    demo: false,
    sol: false,
    ai: false,
  });

  const [initialDisplay, setInitialDisplay] = useState<boolean>();
  const [projectName, setProjectName] = useState<string | null>(null);
  const [submitModal, setSubmitModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [textMessage, setTextmessage] = useState<string>();
  useEffect(() => {
    const name = localStorage.getItem("projectname");
    setProjectName(name);
  }, []);

  const handleInitialDisplay = () => {
    setInitialDisplay((prev) => !prev);
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited") === "true"; // Check if the key exists in localStorage

    if (!hasVisited) {
      // If the key doesn't exist, this is the user's first visit
      setInitialDisplay(true);

      // Set the key in localStorage to mark that the user has visited
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const [codeSolutions, setCodeSolution] = useState<
    codeSolutions | undefined
  >();
  const [activeFile, setActiveFile] = useState<"html" | "css" | "js">("html");
  const [userCode, setUserCode] = useState<usercodeType[]>();
  const [fontSize, setFontSize] = useState<number>(18);
  const handleFileChange = (updatedCode: string) => {
    setFiles((prevFiles) => ({ ...prevFiles, [activeFile]: updatedCode }));
  };

  useEffect(() => {
    const fetchCodeSolution = async () => {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/solutions/getasolutions/${id}`;
      const response = await codeSolution(URL);
      if (response) {
        setCodeSolution(response);
      }
    };
    fetchCodeSolution();
  }, []);

  let demoimage = undefined;
  if (codeSolutions?.demoimage) {
    demoimage = `${process.env.NEXT_PUBLIC_API_URL}${codeSolutions?.demoimage}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Fetch user-saved code
      const fetchUserSavedCode = async () => {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/usercode/getusercode/${id}`;
        const response = await usercodefun({ URL, token });
        return response || [];
      };
      const problemid = localStorage.getItem("problemid");

      // Fetch initial code
      const fetchInitialCode = async () => {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/solutions/initialcode/${problemid}`;
        const response = await initialCode({ URL, token });
        return response || [];
      };

      try {
        // Fetch user-saved code first
        const userSavedCode = await fetchUserSavedCode();
        if (userSavedCode && userSavedCode.length > 0) {
          setUserCode(userSavedCode);
        } else {
          const initialCodeResponse = await fetchInitialCode();
          setUserCode(initialCodeResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (userCode && userCode.length > 0) {
      let htmlcode = "",
        csscode = "",
        jscode = "";

      userCode.forEach((codeInfo) => {
        if (codeInfo.codetype === "html") {
          htmlcode = codeInfo.code;
        } else if (codeInfo.codetype === "css") csscode = codeInfo.code || " ";
        else if (codeInfo.codetype === "js") jscode = codeInfo.code || "";
      });

      setFiles({
        html: htmlcode,
        css: csscode,
        js: jscode,
      });
    }
  }, [userCode]);

  const saveCode = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTextmessage("you are not logged 🔐 in please login to save your code");
      setErrorModal((prev) => !prev);
      return;
    }
    const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/usercode/usercodesubmit/${id}`;

    const code = [
      { codetype: "html", code: files.html },
      { codetype: "css", code: files.css },
      { codetype: "js", code: files.js },
    ];

    await postusercode({ URL, token, code });
  };
  const submitCode = async () => {
    const token = localStorage.getItem("token");
    const problemid = localStorage.getItem("problemid");
    if (!token) {
      setTextmessage("you are not logged 🔐 in please login to save your code");
      setErrorModal((prev) => !prev);
      return;
    }
    const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/userperformace/overallperf/${id}`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message === "success") {
          console.log("iniside");
          const text = `🎉 Congratulations! You've successfully completed the task! 🚀 Keep up the great work`;
          setTextmessage(text);
          setSubmitModal((prev) => !prev);
        } else {
          const text = `😕 Sorry your Performance is less then 50% try Again,Note: please save your code before you submmit`;
          setTextmessage(text);
          setErrorModal((prev) => !prev);
        }
      }
    } catch (err) {
      console.log(err);
    }

    const handelInitialUserData = async () => {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/solutions/createinitialcode/${problemid}`;

      await initialCodePost({ URL, token, userCode });
    };
    handelInitialUserData();
  };

  const isVideo =
    codeSolutions?.demoimage?.endsWith(".mov") ||
    codeSolutions?.demoimage?.endsWith(".mp4") ||
    codeSolutions?.demoimage?.endsWith(".webm");

  return (
    <div className="w-full overflow-hidden flex h-[100vh]">
      <div className="h-full  flex w-full">
        <motion.div
          initial={{ width: "25rem" }}
          animate={
            basicStatechange.width
              ? { width: "25rem", transition: { duration: 0.2 } }
              : { width: "4.5rem", transition: { duration: 0.2 } }
          }
          className="flex h-full overflow-hidden  "
        >
          <Sidebuttons
            setBasicStatechange={setBasicStatechange}
            setFontSize={setFontSize}
            codeSavedbtn={() => saveCode()}
            codeSubmit={submitCode}
          />

          <motion.div
            initial={{ width: "77%" }}
            animate={
              basicStatechange.width
                ? { display: "block", transition: { duration: 0 } }
                : { display: "none", transition: { duration: 0 } }
            }
            className="h-full  bg-neutral-900"
          >
            <div className="projectname border-b border-neutral-800  w-full flex justify-center items-center   h-[7%]">
              <span className="text-[1rem] block w-full text-center ">
                {projectName}
              </span>
            </div>
            <Dropdown activeFile={activeFile} setActiveFile={setActiveFile} />
            <div className="h-[93%] flex flex-col"></div>
          </motion.div>
        </motion.div>

        <div className="h-full   w-full  overflow-hidden bg-neutral-800 p-2">
          <div className="h-full flex justify-center items-center rounded-lg relative   overflow-hidden w-full ">
            <MonacoEditor
              codeformate={basicStatechange.codeformat}
              value={files[activeFile]}
              onChange={handleFileChange}
              language={getLanguage(activeFile)}
              theme="vs-dark"
              height="100%"
              width="100%"
              options={{
                fontSize,
              }}
            />
            {basicStatechange.demo && (
              <div className=" w-full h-full z-[100] absolute rounded-lg flex justify-center items-center  bg-neutral-800">
                {isVideo ? (
                  <video
                    className="rounded-md"
                    width="100%"
                    height="auto"
                    controls
                  >
                    <source src={demoimage} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={demoimage} className="rounded-md" alt="Preview" />
                )}
              </div>
            )}
            {basicStatechange.sol && (
              <div className="w-full h-full z-[100] flex bg-neutral-900 p-2 absolute rounded-lg">
                {codeSolutions &&
                  codeSolutions.code.map((solution, index) => (
                    <CodeDisplay key={index} codesolution={solution} />
                  ))}
              </div>
            )}
            {basicStatechange.ai && <CodeCrewGenAI />}
          </div>
        </div>
      </div>

      {basicStatechange.liveserver && (
        <Liveserver
          viewLive={() => generatePreview(files)}
          serverOn={() =>
            setBasicStatechange((prev) => ({
              ...prev,
              liveserver: !prev.liveserver,
            }))
          }
        />
      )}
      {initialDisplay && (
        <DemoInstructions image={demoimage} democlose={handleInitialDisplay} />
      )}

      {submitModal && (
        <ModalOverlay
          text={textMessage!}
          openModal={() => setSubmitModal((prev) => !prev)}
        />
      )}
      {errorModal && (
        <ErrorModal
          text={textMessage!}
          openModal={() => setErrorModal((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default EditorWithTabs;
