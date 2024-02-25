import React, { useState } from "react";
import userImg from "../assets/img/userImg.png";
import { changeImage } from "../service/service";

const ChangeImageWorker = ({ worker }: { worker: string }) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      console.log(e.target.files[0])
      const file = e.target.files[0];
      const data = new FormData();
      data.append("image", e.target.files[0]);
      const response = await changeImage(data)
    }
  }

  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 ">
      <div className="relative bg-white p-8 rounded-lg w-11/12 lg:w-4/12 flex flex-col items-center">
        <h1 className="text-center text-2xl font-medium pb-3">{worker}</h1>
        <img src={selectedImage ? selectedImage : userImg} className="w-5/6" />
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
        >
          Select a picture
          <input id="file-upload" type="file" name="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export default ChangeImageWorker;
