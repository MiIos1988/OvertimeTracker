import React from "react";
import userImg from "../assets/img/userImg.png";

const ChangeImageWorker = ({ worker }: { worker: string }) => {
  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 ">
      <div className="relative bg-white p-8 rounded-lg w-11/12 lg:w-4/12 flex flex-col items-center">
        <h1 className="text-center text-2xl font-medium pb-3">{worker}</h1>
        <img src={userImg} className="w-5/6" />
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
        >
          Select a file
          <input id="file-upload" type="file" name="file" className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ChangeImageWorker;
