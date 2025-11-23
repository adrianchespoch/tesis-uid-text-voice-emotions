import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:7777";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 120_000,
});
