import axios from "axios"

export const getTokenInLocalStorage = (token: string) => localStorage.getItem(token);

export const createManager = (token: string) => axios.post("/manager/add-manager", token);