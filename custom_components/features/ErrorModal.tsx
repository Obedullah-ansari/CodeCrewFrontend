import React from "react";


const ErrorModal: React.FC<{ text: string;  openModal:()=>void }> = ({ text,openModal}) => {
  
  return (
    <>
      <div className=" w-full h-[100vh] bg-neutral-950/70  absolute top-0 z-[100] flex justify-center items-center ">
        <div className="lg:w-[35%]  bg-neutral-800 md:w-[45%] sm:w-[65%] max-sm:w-[90%] h-[30%] flex flex-col justify-center rounded-md  items-center">
          <div className="w-full h-[50%] p-4 text-center  ">
            <p>{text}</p>
          </div>

          <button
            className="p-[1.5%] w-[20%] text-center  hover:bg-red-500 hover:text-white transition-all rounded-lg bg-white text-neutral-950 "
            onClick={openModal}
          >
           Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
