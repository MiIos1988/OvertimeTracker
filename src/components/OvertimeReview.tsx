import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteOvertimeHours, sendReviewData } from "../service/service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type OvertimeReviewProps = {
  worker: string;
  setHideOvertimeReviewComponent: React.Dispatch<React.SetStateAction<boolean>>;
  onSignOut: (() => void) | undefined;
};
type OvertimeObj = {
  date: string;
  id: string;
  hours: number;
};

const OvertimeReview: React.FC<OvertimeReviewProps> = ({
  worker,
  setHideOvertimeReviewComponent,
  onSignOut,
}) => {
  const [selectedDateStart, setSelectedDateStart] = useState<Date>(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date>(new Date());
  const [allOvertime, setAllOvertime] = useState<OvertimeObj[]>([]);
  const [showAllOvertime, setShowAllOvertime] = useState<boolean>(false);

  const sendOvertimeReviewData = async () => {
    const data = {
      worker,
      startDate: selectedDateStart.toISOString(),
      endDate: selectedDateEnd.toISOString(),
    };

    try {
      const dataOvertime = await sendReviewData(data);
      setAllOvertime(dataOvertime.data.overtimeData);
      setShowAllOvertime(true);
    } catch (error) {
      onSignOut && onSignOut();
    }
  };

  const deleteOvertime = async(id: string) => {
    const deleteHours =  await deleteOvertimeHours(id);
    const deleteId = deleteHours.data.id;
    const newAllOvertime = allOvertime.filter(obj => obj.id !== deleteId);
    setAllOvertime(newAllOvertime);
    
  };

  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white p-8 pt-2 rounded-lg w-11/12 lg:w-7/12 2xl:w-2/4">
        <h1 className="text-2xl font-medium pb-2 text-gray-400 italic">
          Overtime review:
        </h1>
        <h1 className="text-center text-3xl font-medium pb-5">{worker}</h1>
        <div className="sm:flex block justify-between flex-grow">
          <div className="w-36 text-center mx-auto sm:my-0 my-3 relative">
            <h1 className="pr-2 text-gray-400 italic absolute left-[-48px] top-3">
              From:
            </h1>
            <DatePicker
              className="w-full text-xl p-1 border-2 border-gray-500 text-center mx-auto rounded-md"
              selected={selectedDateStart}
              onChange={(date: Date) => setSelectedDateStart(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="w-36 text-center mx-auto sm:my-0 my-3 relative">
            <h1 className="pr-2 text-gray-400 italic absolute left-[-28px] top-3">
              To:
            </h1>
            <DatePicker
              className="w-full text-xl p-1 border-2 border-gray-500 text-center mx-auto rounded-md"
              selected={selectedDateEnd}
              onChange={(date: Date) => setSelectedDateEnd(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="w-36 h-10 text-center mx-auto">
            <button
              className="h-full w-full py-1.5 px-10 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
              onClick={sendOvertimeReviewData}
            >
              Confirm
            </button>
          </div>
        </div>
        <button
          className="text-xl font-medium absolute top-5 right-5"
          onClick={() => setHideOvertimeReviewComponent(true)}
        >
          x
        </button>
      </div>
      {showAllOvertime && (
        <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 ">
          <div className="relative bg-white p-2 sm:p-8 rounded-lg w-11/12 lg:w-5/12">
            <h1 className="text-center text-2xl font-medium pb-3">{worker}</h1>
            <div className=" ">
              <div className="flex justify-center">
                <h1 className="text-xl pb-3 pr-3">Number of overtime hours:</h1>
                <div className="text-2xl font-medium pb-3">
                  {allOvertime.reduce((acc, curr) => acc + curr.hours, 0)}
                </div>
              </div>
              {allOvertime.map((obj, i) => {
                return (
                  <div key={i}>
                    <div className="flex justify-around items-center">
                      <div className="text-xl">{obj.date}</div>
                      <div className="text-xl">{obj.hours}</div>
                      <button
                        className="py-1.5 px-5 my-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => deleteOvertime(obj.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
            <button
              className="text-xl font-medium absolute top-5 right-5"
              onClick={() => {
                setShowAllOvertime(false);
                setHideOvertimeReviewComponent(true);
              }}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OvertimeReview;
