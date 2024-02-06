import axios from "axios"

type CreateManagerData = {
    userId: string,
    email: string
}

export const getTokenInLocalStorage = (token: string) => localStorage.getItem(token);

export const createManager = (data: CreateManagerData) => axios.post("/manager/add-manager", data);