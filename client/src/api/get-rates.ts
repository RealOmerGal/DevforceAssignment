import axiosInstance from "./axios-instance";

export const getRates = async (currencies: string) => {
    return (await axiosInstance.get(`/currencies/rates/${currencies}`)).data
}