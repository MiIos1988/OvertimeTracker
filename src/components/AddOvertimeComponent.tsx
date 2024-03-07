import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SendHoursAndDate } from "../service/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddOvertimeComponentProps = {
  worker: string;
  setHideAddOvertimeComponent: React.Dispatch<React.SetStateAction<boolean>>;
  onSignOut: (() => void) | undefined;
};

const AddOvertimeComponent: React.FC<AddOvertimeComponentProps> = ({
  worker,
  setHideAddOvertimeComponent,
  onSignOut
}) => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const sendOvertimeData = async () => {
    const data = {
      worker,
      hours: inputValue,
      date: selectedDate,
    };
    try {
      await SendHoursAndDate(data);
      setHideAddOvertimeComponent(true);
      toast.success(`Add hours for ${worker}`);
    } catch (error) {
      onSignOut && onSignOut();
    }
  };

  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white p-8 rounded-lg w-11/12 lg:w-7/12 2xl:w-2/4">
        <h1 className="text-center text-2xl font-medium pb-5">{worker}</h1>
        <div className="sm:flex block justify-between flex-grow">
          <div className="w-36 h-10 text-center mx-auto ">
            <button
              className="px-2 h-full w-10 text-2xl rounded-l-md bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() =>
                inputValue >= 0.5 &&
                setInputValue((prevValue) => prevValue - 0.5)
              }
            >
              -
            </button>
            <input
              type="number"
              value={inputValue}
              className="h-full px-2 w-16 text-2xl text-center mx-auto border-2 border-blue-500 custom-number-input"
              onChange={(e) => setInputValue(Number(e.target.value))}
            />
            <button
              className="h-full px-2 w-10 text-2xl rounded-r-md bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => setInputValue((prevValue) => prevValue + 0.5)}
            >
              +
            </button>
          </div>
          <div className="w-36 text-center mx-auto sm:my-0 my-3">
            <DatePicker
              className="w-full text-xl p-1 border-2 border-blue-500 text-center mx-auto rounded-md"
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="w-36 h-10 text-center mx-auto">
            <button
              className="h-full w-full py-1.5 px-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              onClick={sendOvertimeData}
            >
              Confirm
            </button>
          </div>
        </div>
        <button
          className="text-xl font-medium absolute top-5 right-5"
          onClick={() => setHideAddOvertimeComponent(true)}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default AddOvertimeComponent;
