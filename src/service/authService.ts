import axios from "axios"

export const getTokenInLocalStorage = (token: string) => localStorage.getItem(token);

export const createManager = () => axios.post("/manager/add-manager");