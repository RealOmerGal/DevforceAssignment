import axiosInstance from "./axios-instance";
import { Server } from "../types/server";

export const getServers = async () => {
    return (await axiosInstance.get<Server[]>("/")).data;
}