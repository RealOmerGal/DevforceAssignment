import { Response, Request } from "express";
import { serverTypesRepository } from "../datasource";

export const getAllServerTypes = async (req: Request, res: Response) => {
    const types = await serverTypesRepository.find();
    types ? res.status(200).send(types) : res.status(404).send('No types found');
}