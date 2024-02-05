import React, { useEffect, useState } from "react";
import { getTokenInLocalStorage } from "../service/authService";
import axios from "axios";

type MainComponentProps = {
  user?: { username?: string; userId?: string };
  onSignOut: (() => void) | undefined;
};

const MainComponent = ({ user, onSignOut }: MainComponentProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const idToken = `CognitoIdentityServiceProvider.3gt5j5ft7bhsc3qkmtrddcjstt.${user.userId}.idToken`;
      setToken(getTokenInLocalStorage(idToken));
    }
  }, [user]);

  axios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

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
        />
        <button className="bg-gray-300 p-2 ">Add</button>
      </div>
      <div className="flex-1 w-11/12 lg:w-2/4 h-2/4 bg-white shadow-xl bg-opacity-80 mb-14"></div>
    </div>
  );
};

export default MainComponent;
