import axiosInstance from "./axios-instance";
import { CreateServerDto, Server } from "../types/server";

export const createServer = async (dto: CreateServerDto) => {
    return (await axiosInstance.post<Server>("/", {
        ...dto
    })).data;
}