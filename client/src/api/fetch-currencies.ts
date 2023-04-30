
import axiosInstance from "./axios-instance"
export const fetchCurrencies = async (currencies: string) => {
    return (await axiosInstance.get(`/currencies/list/${currencies}`)).data;
}
