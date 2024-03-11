import axios from "axios"

type ChangeWorkerName = {
    nameBeforeChange: string, 
    nameAfterChange: string
}

type HoursAndDate = {
    hours: number,
    date: Date,
    worker: string
}

type ReviewDate = {
    worker: string,
    startDate: Date | string,
    endDate: Date | string,
}

export const getTokenInLocalStorage = (token: string) => localStorage.getItem(token);

export const createManager = (token: string) => axios.post("/manager/add-manager", {token});

export const createWorker = (worker: string) => axios.post("/manager/create-worker", {nameWorker: worker});

export const deleteWorkerInBackend = (worker: string) => axios.delete("/manager/delete-worker", {data: {workerForDelete: worker}});

export const changeWorkerName = (workerName: ChangeWorkerName) => axios.put("/manager/change-worker-name", workerName);

export const changeImage = (image: FormData) => axios.post("/aws-s3/change-image", image);

export const SendHoursAndDate = (data: HoursAndDate) => axios.post("/overtime/send-overtime-data", data);

export const sendReviewData = (data: ReviewDate) => axios.post("/overtime/send-overtime-review-data", data);