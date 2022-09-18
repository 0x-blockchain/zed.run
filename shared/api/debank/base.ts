import axios from "axios";

export const API_URL = "https://api.debank.com";
export const debankAPI = axios.create({
  baseURL: API_URL,
});
