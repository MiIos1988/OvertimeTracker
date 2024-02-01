import React from "react";

type MainComponentProps = {
  user?: { username?: string };
  onSignOut: (() => void) | undefined;
};

const MainComponent = ({ user, onSignOut }: MainComponentProps) => {
    
  return (
    <div className="h-screen w-screen relative flex flex-col  items-center ">
      {/* <h1 >Hello {user?.username}</h1> */}
      <h1 className="text-3xl font-bold text-gray-600 mt-8 ">WHEN I WORK</h1>
      <button
        className="bg-cyan-800 text-white rounded-md p-2 absolute right-2 bottom-2 "
        onClick={onSignOut}
      >
        Sign out
      </button>
      <div className="flex w-11/12 lg:w-2/4 my-8">
        <input
          className="w-full p-2 shadow-xl text-lg"
          type="text"
          placeholder="Enter the worker"
        />
        <button className="bg-gray-300 p-2 ">Add</button>
      </div>
      <div className="flex-1 w-11/12 lg:w-2/4 h-2/4 bg-white shadow-xl bg-opacity-80 mb-14"></div>
    </div>
  );
};

export default MainComponent;