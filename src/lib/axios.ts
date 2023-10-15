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

export async function generateSections(
  id: string,
  title: string,
  answers: any[]
) {
  let response = await request("api/plans/generate", {
    planId: id,
    planName: title,
    answers,
  });

  return response;
}

export async function getResponseFromChat(
  id: string,
  title: string,
  message: string
) {
  let response = await request(`api/study/${id}/messages`, {
    planName: title,
    question: message,
  });

  return response;
}

export async function getDescription(title: string) {
  let response = await request(`api/description/generate`, {
    planName: title,
  });

  return response;
}
