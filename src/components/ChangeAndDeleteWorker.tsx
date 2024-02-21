import React, { useEffect, useRef, useState } from "react";
import { deleteWorkerInBackend } from "../service/service";

type ChangeAndDeleteWorkerProps = {
  worker: string;
  setHideChangeAndDeleteComponent: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setAllWorkers: React.Dispatch<React.SetStateAction<string[]>>;
};

const ChangeAndDeleteWorker: React.FC<ChangeAndDeleteWorkerProps> = ({
  worker,
  setHideChangeAndDeleteComponent,
  setAllWorkers,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDeleteWin, setShowDeleteWin] = useState<boolean>(false);
  const [showChangeWin, setShowChangeWin] = useState<boolean>(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInnerDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const deleteWorker = async () => {
    try {
      const response = await deleteWorkerInBackend(worker);
      setAllWorkers(response.data.allWorkers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 "
      style={{ backdropFilter: "blur(5px)" }}
      onClick={() => setHideChangeAndDeleteComponent(true)}
    >
      <div
        className="relative bg-white p-8 rounded-lg w-11/12 lg:w-5/12"
        onClick={handleInnerDivClick}
      >
        <h1 className="text-center text-2xl font-medium pb-3">{worker}</h1>
        <div className="flex flex-col sm:flex-row justify-evenly ">
          <button
            className="text-xl font-medium py-1.5 px-5 mb-3 rounded-md bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setShowDeleteWin(true)}
          >
            Delete worker
          </button>
          <button
            className="text-xl font-medium py-1.5 px-5 mb-3 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => setShowChangeWin(true)}
          >
            Change name
          </button>
        </div>
        <button
          className="text-xl font-medium absolute top-5 right-5"
          onClick={() => setHideChangeAndDeleteComponent(true)}
        >
          x
        </button>
      </div>
      {showDeleteWin && (
        <div
          className="absolute w-screen h-screen flex justify-center items-center bg-opacity-75 "
          onClick={handleInnerDivClick}
        >
          <div className="relative bg-white p-8 rounded-lg w-11/12 lg:w-5/12">
            <h1 className="text-center text-2xl font-medium pb-3">
              Are you sure?
            </h1>
            <div className="flex flex-col sm:flex-row justify-evenly ">
              <button
                className="text-xl font-medium py-1.5 px-5 mb-3 rounded-md bg-red-500 hover:bg-red-600 text-white"
                onClick={deleteWorker}
              >
                Delete
              </button>
              <button
                className="text-xl font-medium py-1.5 px-5 mb-3 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={() => setShowDeleteWin(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showChangeWin && (
        <div
          className="absolute w-screen h-screen flex justify-center items-center bg-opacity-75 "
          onClick={handleInnerDivClick}
        >
          <div className="relative bg-white px-2 sm:px-8 py-8 rounded-lg w-11/12 lg:w-5/12 ">
            <h1 className="text-center text-2xl font-medium ">Change name</h1>
            <div className="flex w-11/12 xl:w-2/4 my-4 mx-auto">
              <input
                className="w-full p-2 shadow-xl text-lg"
                type="text"
                placeholder="Change name"
                ref={inputRef}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 ">
                Change
              </button>
            </div>
            <button
              className="text-xl font-medium absolute top-5 right-5"
              onClick={() => setShowChangeWin(false)}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeAndDeleteWorker;
