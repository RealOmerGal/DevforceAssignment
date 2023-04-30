import { Response, Request } from "express";
import axios from "axios";
require('dotenv').config()

const apiKey = process.env.API_KEY;

export const getCurrencies = async (req: Request, res: Response) => {
    const { currencies } = req.params;
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}&currencies=${currencies}`)
    res.status(200).send(response.data.data);
}

export const getRates = async (req: Request, res: Response) => {
    const { currencies } = req.params;
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${currencies}`)
    res.status(200).send(response.data.data);
}