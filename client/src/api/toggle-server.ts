import axiosInstance from "./axios-instance";
import { Server } from "../types/server";

export const toggleServer = async (serverId: Server["id"]) => {
    return (await axiosInstance.patch<Server>(`/${serverId}`)).data;
}