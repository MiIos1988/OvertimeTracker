import React from "react";

const ChangeAndDeleteWorker = ({ worker }: { worker: string }) => {
  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 " style={{ backdropFilter: 'blur(5px)' }}>
      <div className='relative bg-white p-8 rounded-lg w-11/12 lg:w-5/12'>
        <h1 className="text-center text-2xl font-medium pb-3">{worker}</h1>
        <div className="flex flex-col sm:flex-row justify-evenly ">
            <button className="text-xl font-medium py-1.5 px-5 mb-3 rounded-md bg-red-500 hover:bg-red-600 text-white">Delete worker</button>
            <button className="text-xl font-medium py-1.5 px-5 mb-3 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white">Change name</button>
        </div>
      <button className="text-xl font-medium absolute top-5 right-5">x</button>
      </div>
    </div>
  );
};

export default ChangeAndDeleteWorker;
