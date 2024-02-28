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

type MainComponentProps = {
  user?: { username?: string; userId?: string };
  onSignOut: (() => void) | undefined;
};

const MainComponent = ({ user, onSignOut }: MainComponentProps) => {
  const [tokenAccess, setTokenAccess] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [inputWorker, setInputWorker] = useState<string>("");
  const [allWorkers, setAllWorkers] = useState<string[]>([]);
  const [clickWorker, setClickWorker] = useState<string>("");
  const [hideChangeAndDeleteComponent, setHideChangeAndDeleteComponent] =
    useState<boolean>(true);
  const [hideChangeImageComponent, setHideChangeImageComponent] = useState<boolean>(true)

  const addWorkerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWorker(e.target.value);
  };
  const addWorkerBtn = async () => {
    if (inputWorker) {
      const response = await createWorker(inputWorker);
      setInputWorker("");
      if (response.data === "Worker exist") {
        toast.error("Worker exist!!!");
      } else {
        setAllWorkers(response.data.allWorkers);
      }
    }
  };

   const changeImage = (worker: string) => {
    setClickWorker(worker);
   }

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
          console.log("Success");
        }
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();
  }, [tokenAccess]);

  const openChangeAndDeleteWin = (worker: string) => {
    setClickWorker(worker);
    setHideChangeAndDeleteComponent(false);
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
      <div className="flex w-11/12 xl:w-2/4 my-8">
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
      <div className="flex-1 w-11/12 xl:w-2/4 h-2/4 bg-white shadow-xl bg-opacity-80 mb-14 overflow-auto">
        {allWorkers.map((worker, index) => {
          return (
            <div key={index}>
              <div className="flex items-center py-2 hover:bg-gray-100">
                <div className="px-3" onClick={() => changeImage(worker)}>
                  <img
                    src={userImg}
                    alt="Change image"
                    className="w-10 cursor-pointer"
                  />
                </div>
                <div className="md:flex block flex-grow justify-between">
                  <div
                    className="flex items-center text-xl font-medium hover:font-bold cursor-pointer"
                    onClick={() => openChangeAndDeleteWin(worker)}
                  >
                    {worker}
                  </div>
                  <div>
                    <button className="md:mr-12 mr-2 py-1.5 md:px-5 px-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
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
        />
      )}
      {
        hideChangeImageComponent && (
          <ChangeImageWorker worker={clickWorker}/>
        )
      }
    </div>
  );
};

export default MainComponent;
