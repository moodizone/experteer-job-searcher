import { baseURL } from "../constant/baseURL";
import axios from "axios";
import { JobType } from "./type";

export interface SearchBody {
  Query: string;
  Limit: string;
}
const search = async ({ Query, Limit }: SearchBody) => {
  const url = `${baseURL}/search?query=${Query}&limit=${Limit}`;
  const response = await axios.post<JobType[] | string>(url);

  // results cached by backend
  if (response.status === 200) {
    return response.data as JobType[];
  }
  // new UUID
  else {
    return response.data as string;
  }
};
const status = async (uuid: string) => {
  const url = `${baseURL}/status/${uuid}`;
  const response = await axios.get(url);
  return response.status;
};
const result = async (uuid: string) => {
  const url = `${baseURL}/result/${uuid}`;
  const response = await axios.get<JobType[]>(url);

  if(response.status === 200){
    return response.data as JobType[];
  }
};

export const jobSearcherApi = { search, status, result };
