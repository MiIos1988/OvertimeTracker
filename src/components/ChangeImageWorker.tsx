import React, { useState } from "react";
import { changeImage } from "../service/service";
import userImg from "../assets/img/userImg.png";

type AllWorkers = {
  nameWorker: string;
  image: string;
};
type ChangeImageWorkerProps = {
  worker: string;
  workerImg: string;
  setHideChangeImageComponent: React.Dispatch<React.SetStateAction<boolean>>;
  setAllWorkers: React.Dispatch<React.SetStateAction<AllWorkers[]>>;
  onSignOut: (() => void) | undefined;
};

const ChangeImageWorker: React.FC<ChangeImageWorkerProps> = ({
  worker,
  workerImg,
  setHideChangeImageComponent,
  setAllWorkers,
  onSignOut,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [urlImage, setUrlImage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUrlImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  const uploadImage = async () => {
    if (image) {
      const data = new FormData();
      data.append("image", image);
      data.append("worker", worker);
      try {
        const response = await changeImage(data);
        setHideChangeImageComponent(true);
        setAllWorkers(response.data.allWorkers);
      } catch (error) {
        onSignOut && onSignOut();
      }
    }
  };
  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 ">
      <div className="relative bg-white p-8 rounded-lg w-11/12 lg:w-3/12 flex flex-col items-center">
        <h1 className="text-center text-2xl font-medium pb-3">{worker}</h1>
        <img
          src={urlImage ? urlImage : workerImg ? workerImg : userImg}
          className="w-40 h-40 rounded-full bg-cover mb-5"
        />
        <label
          htmlFor="file-upload"
          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-yellow-600"
        >
          Select a picture
          <input
            id="file-upload"
            type="file"
            name="file"
            className="hidden"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
          />
        </label>
        {urlImage && (
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-blue-600 mt-2"
            onClick={uploadImage}
          >
            Confirm
          </button>
        )}
        <button
          className="text-xl font-medium absolute top-5 right-5"
          onClick={() => setHideChangeImageComponent(true)}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default ChangeImageWorker;
