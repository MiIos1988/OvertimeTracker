import axios from "axios"

export const getTokenInLocalStorage = (token: string) => localStorage.getItem(token) 