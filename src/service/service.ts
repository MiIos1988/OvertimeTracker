import axios from "axios"

type ChangeWorkerName = {
    nameBeforeChange: string, 
    nameAfterChange: string
}

export const getTokenInLocalStorage = (token: string) => localStorage.getItem(token);

export const createManager = (token: string) => axios.post("/manager/add-manager", {token});

export const createWorker = (worker: string) => axios.post("/manager/create-worker", {nameWorker: worker});

export const deleteWorkerInBackend = (worker: string) => axios.delete("/manager/delete-worker", {data: {workerForDelete: worker}});

export const changeWorkerName = (workerName: ChangeWorkerName) => axios.put("/manager/change-worker-name", workerName);