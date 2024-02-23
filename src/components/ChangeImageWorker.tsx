import React from 'react';
import userImg from "../assets/img/userImg.png";

const ChangeImageWorker = ({worker}: {worker: string}) => {
  return (
    <div className='absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 '>
        <div className="relative bg-white p-8 rounded-lg w-11/12 lg:w-1/5 flex flex-col items-center">
          <h1 className='text-center text-2xl font-medium pb-3'>{worker}</h1>
          <img src={userImg} className='w-5/6'/>
          <input type="file" name="" id="" />
        </div>
    </div>
  )
}

export default ChangeImageWorker
