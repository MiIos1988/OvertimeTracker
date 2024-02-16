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

type MainComponentProps = {
  user?: { username?: string; userId?: string };
  onSignOut: (() => void) | undefined;
};

const MainComponent = ({ user, onSignOut }: MainComponentProps) => {
  const [tokenAccess, setTokenAccess] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [inputWorker, setInputWorker] = useState<string>("");
  const [allWorkers, setAllWorkers] = useState<string[]>([]);

  const addWorkerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWorker(e.target.value);
  };
  const addWorkerBtn = async () => {
    if (inputWorker) {
      const response = await createWorker(inputWorker);
      setInputWorker("");
      setAllWorkers(response.data.allWorkers);
    }
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
          console.log("Success");
        }
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();
  }, [tokenAccess]);

  return (
    <div className="h-screen w-screen relative flex flex-col  items-center ">
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
          onChange={addWorkerInput}
          value={inputWorker}
        />
        <button className="bg-gray-300 p-2 " onClick={addWorkerBtn}>
          Add
        </button>
      </div>
      <div className="flex-1 w-11/12 lg:w-2/4 h-2/4 bg-white shadow-xl bg-opacity-80 mb-14">
        {allWorkers.map((worker, index) => {
          return (
            <div key={index} className="flex items-center">
              <div>
                <img src={userImg} alt="Change image" className="w-10" />
              </div>
              <div className="flex justify-between items-center">
                <div className="mr-2">{worker}</div>
                <button className="mr-2">Add time</button>
                <button>Show</button>
              </div>
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
    </div>
  );
};

export default MainComponent;
