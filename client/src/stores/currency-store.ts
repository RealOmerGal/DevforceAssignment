import { create } from 'zustand'
import { fetchCurrencies } from '../api/fetch-currencies';
import { getRates } from '../api/get-rates';

interface Currency {
    code: string;
    rate: number;
    symbol_native: string;
}

interface CurrencyStore {
    currencyCode: string,
    currencies: Record<string, Currency>;
    changeCurrency: (newCode: string) => void,
    getCurrencies: () => void;

}

export const useCurrencyStore = create<CurrencyStore>((set) => ({
    currencyCode: "",
    currencies: {},
    changeCurrency(currencyCode: string) {
        set({ currencyCode });
    },
    async getCurrencies() {
        const currencyCodes = 'USD,ILS,EUR';
        //Get currencies data and rates
        const currencies = await fetchCurrencies(currencyCodes);
        const rates = await getRates(currencyCodes);
        //Fill the currencies object with the data
        for (const currencyCode in currencies) {
            currencies[currencyCode].rate = rates[currencyCode];
        }
        set({ currencies, currencyCode: "USD" })
    }
}))

