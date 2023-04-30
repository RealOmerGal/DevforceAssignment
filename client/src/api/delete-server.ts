import axiosInstance from "./axios-instance";
import { Server } from "../types/server";

export const deleteServer = async (serverId: Server["id"]) => {
    return await axiosInstance.delete<void>(`/${serverId}`);
}