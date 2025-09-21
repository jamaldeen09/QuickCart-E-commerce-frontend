import axios, { AxiosError } from "axios"

axios.defaults.baseURL = "http://localhost:4080"
axios.defaults.withCredentials = true;

export const axiosHandlers = {
    axios,
    axiosError: AxiosError
}
