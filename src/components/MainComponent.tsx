import React, { useEffect, useState } from "react";
import {
  createManager,
  createWorker,
  getTokenInLocalStorage,
} from "../service/service";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImg from "../assets/img/userImg.png";
import ChangeAndDeleteWorker from "./ChangeAndDeleteWorker";
import ChangeImageWorker from "./ChangeImageWorker";
import AddOvertimeComponent from "./AddOvertimeComponent";

type MainComponentProps = {
  user?: { username?: string; userId?: string };
  onSignOut: (() => void) | undefined;
};
type AllWorkers = {
  nameWorker: string;
  image: string;
};

const MainComponent = ({ user, onSignOut }: MainComponentProps) => {
  const [tokenAccess, setTokenAccess] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [inputWorker, setInputWorker] = useState<string>("");
  const [allWorkers, setAllWorkers] = useState<AllWorkers[]>([]);
  const [clickWorker, setClickWorker] = useState<string>("");
  const [clickWorkerImage, setClickWorkerImage] = useState<string>("");
  const [hideChangeAndDeleteComponent, setHideChangeAndDeleteComponent] =
    useState<boolean>(true);
  const [hideChangeImageComponent, setHideChangeImageComponent] =
    useState<boolean>(true);
  const [hideAddOvertimeComponent, setHideAddOvertimeComponent] =
    useState<boolean>(true);

  const addWorkerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWorker(e.target.value);
  };
  const addWorkerBtn = async () => {
    if (inputWorker) {
      try {
        const response = await createWorker(inputWorker);
        setInputWorker("");
        if (response.data === "Worker exist") {
          toast.error("Worker exist!!!");
        } else {
          setAllWorkers(response.data.allWorkers);
        }
      } catch (error) {
        onSignOut && onSignOut();
      }
    }
  };

  const changeImage = (worker: string) => {
    setClickWorker(worker);
    setHideChangeImageComponent(false);
  };

  useEffect(() => {
    if (user) {
      const accessToken = `CognitoIdentityServiceProvider.${process.env.REACT_APP_AWS_USER_POOLS}.${user.userId}.accessToken`;
      const idToken = `CognitoIdentityServiceProvider.${process.env.REACT_APP_AWS_USER_POOLS}.${user.userId}.idToken`;
      setTokenAccess(getTokenInLocalStorage(accessToken));
      setTokenId(getTokenInLocalStorage(idToken));
    }
  }, [user]);

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000/api";
    const interceptor = axios.interceptors.request.use((config) => {
      if (tokenAccess) {
        config.headers.Authorization = `Bearer ${tokenAccess}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [tokenAccess]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tokenId) {
          const response = await createManager(tokenId);
          if (response.data === "Create manager") {
            toast.success("Hello...");
          } else {
            setAllWorkers(response.data.allWorkers);
          }
        }
      } catch (err) {
        onSignOut && onSignOut();
      }
    };
    fetchData();
  }, [tokenAccess]);

  const changeImageFun = (nameWorker: string) => {
    changeImage(nameWorker);
    const workerObj = allWorkers.find(
      (worker) => worker.nameWorker === nameWorker
    );
    workerObj && setClickWorkerImage(workerObj.image);
  };

  const openChangeAndDeleteWin = (worker: string) => {
    setClickWorker(worker);
    setHideChangeAndDeleteComponent(false);
  };

  const openAddOvertimeWin = (worker: string) => {
    setClickWorker(worker);
    setHideAddOvertimeComponent(false);
  };

  return (
    <div className="h-screen w-screen relative flex flex-col  items-center ">
      <h1 className="sm:text-3xl text-2xl font-bold text-gray-600 mt-8 bg-white shadow-xl bg-opacity-40 px-2">
        WHEN I WORKED LONGER
      </h1>
      <button
        className="bg-cyan-800 text-white rounded-md p-2 absolute right-2 bottom-2 "
        onClick={onSignOut}
      >
        Sign out
      </button>
      <div className="flex w-11/12 xl:w-7/12 2xl:w-2/4 my-8">
        <input
          className="w-full p-2 shadow-xl text-lg"
          type="text"
          placeholder="Enter the worker"
          onChange={addWorkerInput}
          value={inputWorker}
        />
        <button className="bg-gray-300 p-2 " onClick={addWorkerBtn}>
          Add
        </button>
      </div>
      <div className="flex-1 w-11/12 xl:w-7/12 2xl:w-2/4 h-2/4 bg-white shadow-xl bg-opacity-80 mb-14 overflow-auto">
        {allWorkers.map((worker, index) => {
          return (
            <div key={index}>
              <div className="flex items-center py-2 hover:bg-gray-100">
                <div
                  className="px-3"
                  onClick={() => changeImageFun(worker.nameWorker)}
                >
                  <img
                    src={worker && worker.image ? worker.image : userImg}
                    className="w-10 h-10 bg-cover cursor-pointer rounded-full"
                  />
                </div>
                <div className="md:flex block flex-grow justify-between ">
                  <div
                    className="flex items-center text-xl font-medium hover:font-bold cursor-pointer overflow-x-auto"
                    onClick={() => openChangeAndDeleteWin(worker.nameWorker)}
                  >
                    {worker.nameWorker}
                  </div>
                  <div>
                    <button
                      className="md:mr-12 mr-2 py-1.5 md:px-5 px-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => openAddOvertimeWin(worker.nameWorker)}
                    >
                      Add overtime
                    </button>
                    <button className="md:mr-12 mr-1 py-1.5 md:px-5 px-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white">
                      Show overtime
                    </button>
                  </div>
                </div>
              </div>
              <hr className="w-11/12 mx-auto shadow-md" />
            </div>
          );
        })}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {!hideChangeAndDeleteComponent && (
        <ChangeAndDeleteWorker
          worker={clickWorker}
          setHideChangeAndDeleteComponent={setHideChangeAndDeleteComponent}
          setAllWorkers={setAllWorkers}
          onSignOut={onSignOut}
        />
      )}
      {!hideChangeImageComponent && (
        <ChangeImageWorker
          worker={clickWorker}
          workerImg={clickWorkerImage}
          setHideChangeImageComponent={setHideChangeImageComponent}
          setAllWorkers={setAllWorkers}
          onSignOut={onSignOut}
        />
      )}
      {!hideAddOvertimeComponent && (
        <AddOvertimeComponent
          worker={clickWorker}
          setHideAddOvertimeComponent={setHideAddOvertimeComponent}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};

export default MainComponent;
