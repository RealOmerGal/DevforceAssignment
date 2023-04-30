import { serverTypesRepository } from "./datasource";

export const seedServerTypes = async () => {

    const serverTypes = [
        {
            name: 't1.xl',
            pricePerMinute: 10
        },
        {
            name: 't2.xl',
            pricePerMinute: 11
        },
        {
            name: 't1.xll',
            pricePerMinute: 12
        },
    ]
    const types = await serverTypesRepository.find();
    if (!types.length) {
        const data = serverTypesRepository.create(serverTypes);
        await serverTypesRepository.save(data);
    }
}