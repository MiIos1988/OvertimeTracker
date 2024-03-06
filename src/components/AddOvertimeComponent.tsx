import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type AddOvertimeComponentProps = {
  worker: string;
};

const AddOvertimeComponent: React.FC<AddOvertimeComponentProps> = ({
  worker,
}) => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white p-8 rounded-lg w-11/12 lg:w-5/12">
        <h1 className="text-center text-2xl font-medium pb-3">{worker}</h1>
        <div className="flex justify-between flex-grow">
          <div>
            <button
              className="px-2 h-full w-10 text-2xl rounded-l-md bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => inputValue >= 0.5 && setInputValue((prevValue) => prevValue - 0.5)}
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
          <div>

          <DatePicker
          className="w-32 text-xl p-1 border-2 border-blue-500 text-center mx-auto"
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          />
          </div>
          <div>
            
          <button className="h-full w-full md:mr-12 mr-2 py-1.5 md:px-5 px-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
            Confirm
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOvertimeComponent;
