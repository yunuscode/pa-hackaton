import axios, { AxiosRequestConfig } from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function request(url, ...props) {
  let response = await axios.post(BACKEND_URL + `/${url}`, ...props);
  return response;
}

export async function generateQuestions(id: string, title: string) {
  let response = await request("api/questions/generate", {
    planId: id,
    planName: title,
  });

  return response;
}
