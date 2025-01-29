"useclient";
import React from "react";
import Image from "next/image";
import userImageDelete from "@/app/user/userImagesDelete";
import userImageUpload from "@/app/user/userImagesUploads";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useState, useRef, useEffect } from "react";
import defaultimg from "@/public/user.png";
import { Trash2, LogOut,CircleX,Upload} from "lucide-react";

const UserSideNav: React.FC<{
  userimage: string | undefined;
  username: string | undefined;
  useremail: string | undefined;
  totalproj: string | undefined;
  currentproj: string | undefined;
  update: () => void;
  opennav: () => void;
}> = ({
  opennav,
  useremail,
  username,
  totalproj,
  currentproj,
  userimage,
  update,
}) => {
  const [authState, setAuthState] = useState<string|null>()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 15,
    y: 15,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > 512000) {
      setError("File size must be 500KB or less");
      return;
    }

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const generateCroppedImage = async () => {
    if (completedCrop && imageRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const crop = completedCrop;

      const image = imageRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate scale
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Set canvas dimensions to the cropped area in natural size
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      // Draw the cropped area on the canvas
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert canvas to blob
      return new Promise<File>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const croppedFile = new File([blob], "cropped_image.png", {
                type: blob.type,
              });
              resolve(croppedFile);
            }
          },
          "image/png",
          1
        );
      });
    }
  };

  const handelUserImagesUpload = async () => {
    const croppedFile = await generateCroppedImage();
    if (croppedFile) {
      const response = await userImageUpload(croppedFile);
      if (response) {
        update();
        localStorage.setItem("userimage", response)
      }
      setSelectedImage(null);
    }
  };

  const handelUserImagesDelete = async () => {
    const response = await userImageDelete();
    if (response === null){
      update();
      localStorage.removeItem("userimage")
    }
  };

  const handelLogout = () => {
   
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
   const token = localStorage.getItem("token");
   setAuthState(token)
  },[]);

 

  return (
    <>
      <div className=" h-full  relative  bg-neutral-900  border-r border-neutral-700 justify-center items-center flex flex-col ">
        <button
          onClick={opennav}
          className="absolute hidden max-sm:block top-3  right-3 mr-1"
        >
          <CircleX/>
        </button>

        <div className="image w-full  p-2     h-[45%]  ">
          <div className="w-full h-full flex bg-neutral-800 rounded-md justify-center items-center flex-col gap-2">
            <Image
              className="w-[13rem] h-[13rem] rounded-full"
              src={
                userimage?.trim() === "default.jpg" || !userimage
                  ? defaultimg
                  : userimage
              }
              alt="user-image"
              width={128}
              height={128}
            />
            <div className="border border-neutral-300  w-[50%] h-[15%] rounded-md flex justify-center items-center gap-3">
              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {userimage?.trim() === "default.jpg" ? (
                <button onClick={() => fileInputRef.current?.click()}>
                  <Upload/>
                </button>
              ) : (
                <button onClick={handelUserImagesDelete}>
                  <Trash2  style={{color:"red"}}/>
                </button>
              )}
              {authState &&
              <button onClick={handelLogout}>
                <LogOut />
              </button>
              }
            </div>
          </div>
        </div>

        <div className="editpage flex flex-col p-2 justify-start items-center  max-sm:h-[70%] sm:h-[67%] lg:h-[65%]  w-full">
          {error && <span className="text-sm text-red-500">{error}</span>}
          <div className="h-[30%] max-sm:h-[20%]   flex flex-col justify-center  w-full items-center ">
            <h1 className="lg:text-[1.3rem] md:text-[1.4rem] max-sm:text-[1.2rem] sm:text-[1.2rem]">
              welcom to codecrew {username}
            </h1>
            <p className="sm:text-[0.9rem]">{useremail}</p>
          </div>

          <div className=" w-full bg-neutral-800 rounded-md h-full  ">
            <table className="w-full h-full max-sm:h-[95%]   text-white">
              <thead>
                <tr>
                  <th colSpan={2} className="text-center text-xl p-4">
                    Project Summary
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 ">Total projects done</td>
                  <td className="p-4 ">{totalproj}</td>
                </tr>
                <tr>
                  <td className="p-4  ">Currently working</td>
                  <td className="p-4 ">{currentproj}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className="flex bg-neutral-900  absolute top-0 flex-col z-[100000] justify-center items-center h-[100vh] w-full">
          <div className="h-[85%] bg-red-600 w-auto flex justify-center items-center bg-contain ">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              circularCrop
              aspect={1}
            >
              <Image
                ref={imageRef}
                className="w-full  h-full object-contain "
                src={selectedImage}
                alt="Selected image"
                width={128}
                height={128}
              />
            </ReactCrop>
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="flex justify-center gap-3 items-center w-[50%]">
            <button
              onClick={handelUserImagesUpload}
              className="btn-primary p-2 mt-2 rounded-md text-cyan-300"
            >
              Upload
            </button>
            <button
              onClick={() => setSelectedImage("")}
              className="btn-primary p-2  mt-2 rounded-full text-red-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSideNav;
