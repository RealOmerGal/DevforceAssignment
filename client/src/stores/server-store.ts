import { create } from 'zustand'
import { CreateServerDto, Server } from '../types/server'
import { getServers } from '../api/get-servers'
import { deleteServer } from '../api/delete-server';
import { createServer } from '../api/create-server';
import { toggleServer } from '../api/toggle-server';

interface ServerStore {
    servers: Server[],
    getServers: () => void,
    deleteServer: (id: Server["id"], index: number) => void,
    createServer: (createServerDto: CreateServerDto) => void,
    toggleServer: (id: Server["id"], index: number) => void;
}

export const useServerStore = create<ServerStore>((set, get) => ({
    servers: [],
    getServers: async () => {
        const response = await getServers();
        set({ servers: response });
    },
    deleteServer: async (serverId: Server["id"], index: number) => {
        await deleteServer(serverId);
        const serversState = get().servers;
        //Remove the deleted server from the state
        const filtered = [...serversState.slice(0, index), ...serversState.slice(index + 1)];
        set({ servers: filtered })

    },
    createServer: async (createServerDto: CreateServerDto) => {
        const response = await createServer(createServerDto);
        const existingServers = get().servers;
        const newServer = {
            ...response,
            type: response.type,
        };
        set({ servers: [...existingServers, newServer] });
    },
    toggleServer: async (id: Server["id"], index: number) => {
        const response = await toggleServer(id);
        const existingServers = get().servers
        //Update the servers array at index with the new server data
        existingServers[index] = { ...response, ...existingServers[index] };
        set({ servers: [...existingServers] });
    }
}))

