import axiosInstance from "./axios-instance";
import { ServerType } from "../types/server-type";

export const getServersTypes = async () => {
    return (await axiosInstance.get<ServerType[]>("/types")).data;
}