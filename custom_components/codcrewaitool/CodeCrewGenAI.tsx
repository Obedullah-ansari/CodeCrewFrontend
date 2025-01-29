import React, { useState, useRef, useEffect } from "react";
import askAi from "./askAi";
import chatlogo from "@/public/chat.png";
import chatgo from "@/public/arrowhead.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeCrewGenAI: React.FC = ({
  
}) => {
  const [prompt, setPrompt] = useState<string>();
  const [response, setResponse] = useState<string>();
  const [recentReponse, setRecentResponse] = useState<string>();
  const [textareaHeight, setTextareaHeight] = useState<number>(48);
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(Math.min(scrollHeight, 120));
    }
  }, [prompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt && !prompt.trim()) {
      setResponse("Please enter a valid prompt.");
      return;
    }
    setLoading(true);
    const aiResponse = await askAi(prompt);
    if(aiResponse){
    setResponse(aiResponse);
    setLoading(false);
    localStorage.setItem("airesponse", JSON.stringify(aiResponse));
    setPrompt("");
    }
    setTextareaHeight(48);
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
    }
  };

  useEffect(() => {
    const recentcode = localStorage.getItem("airesponse");
    if (recentcode) {
      try {
        setRecentResponse(JSON.parse(recentcode));
      } catch (e) {
        console.error("Error parsing the recent code:", e);
        setRecentResponse(""); 
      }
    } else {
      setRecentResponse(""); 
    }
  }, [recentReponse]);

  return (
    <>
      <div className="w-full h-full top-0 z-[100] absolute flex justify-center items-center flex-col bg-neutral-900 rounded-lg shadow-md">
        <div className="w-[95%] h-[80%]  pt-8 overflow-auto">
          <span>
            <Image src={chatlogo} alt="" className="w-[2rem]" />
          </span>
          {loading ? (
            <div className="w-full flex flex-col justify-center items-start">
              <img
                src="https://i.gifer.com/origin/7e/7e0bcff70452c2eca7f1250938b226c3_w200.webp"
                alt="Loading..."
                className="w-[5rem] "
              />
            </div>
          ) : (
            <SyntaxHighlighter style={tomorrow} language="javascript">
              {response ||
                recentReponse ||
                "Hey there, I'm your friendly AI tutor, here to help you with any questions you have."}
            </SyntaxHighlighter>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-[20%] flex justify-center items-center"
        >
          <motion.div className="w-[95%] bg-transparent border border-neutral-700 p-2 rounded-lg flex items-center">
            <motion.textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type here..."
              animate={{ height: `${textareaHeight}px` }}
              transition={{
                duration: 0.2,
              }}
              className="chattextarea p-2 text-neutral-300 bg-transparent border-none resize-none overflow-auto w-full"
            />
            <button type="submit" className="ml-2 z-10">
              <Image src={chatgo} alt="Send" className="w-[2rem]" />
            </button>
          </motion.div>
        </form>
      </div>

    
    </>
  );
};

export default CodeCrewGenAI;
