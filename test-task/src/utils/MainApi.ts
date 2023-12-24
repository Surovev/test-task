import axios from "axios";
import { Site, Test } from "../types/dataType";
import { BASE_URL } from "../constants/constants";

export const getSites = axios.get<Site[]>(`${BASE_URL}/sites`);


export const getTests = axios.get<Test[]>(`${BASE_URL}/tests`);
