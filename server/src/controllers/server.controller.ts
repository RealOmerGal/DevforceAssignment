import { Request, Response } from "express"
import { serverRepository } from "../datasource"
import { Server } from "../entities/Server";


export const addServer = async (req: Request, res: Response) => {
    const createServerDto = req.body;
    const server = serverRepository.create({
        type: { id: createServerDto.typeId },
        ...createServerDto
    } as Server);
    try {
        const savedServer = await serverRepository.save(server);
        //Have to do this in order to load server's relation
        const serverWithType = await serverRepository.findOne({ where: { id: savedServer.id }, relations: { type: true } })
        return res.status(201).send(serverWithType);
    } catch (err) {
        return res.status(400).send('Bad request');
    }

}

export const getAllServers = async (req: Request, res: Response) => {
    const servers = await serverRepository.find({ relations: { type: true }, order: { id: 'ASC' } });
    servers ? res.status(200).send(servers) : res.status(404).send('No servers found');
}


export const deleteServer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await serverRepository.delete({ id })
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Interval server error');
    }
}

export const toggleServer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const server = await serverRepository.findOne({ where: { id } });
    if (!server) return res.status(404).send('Server not found');

    //if is stopping running server
    if (server.isRunning) {
        server.isRunning = false;
        const timeServerRanInSeconds = Math.floor((Date.now() - server.lastActivated.getTime()) / 1000);
        const totalRuntime = new Date(server.totalRuntimeInMilis);
        //Add this runs's seconds to total
        totalRuntime.setSeconds(totalRuntime.getSeconds() + timeServerRanInSeconds);
        server.totalRuntimeInMilis = totalRuntime;
    }
    //if turning a server on
    else {
        server.lastActivated = new Date();
        server.isRunning = true;
    }
    await serverRepository.save(server);
    return res.status(200).send(server)
}


