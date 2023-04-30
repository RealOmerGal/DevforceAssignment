import { ServerType } from './server-type';

export interface CreateServerDto {
    ipAddress: string,
    name: string,
    typeId: ServerType["id"]

}

export interface Server {
    id: string,
    ipAddress: string,
    name: string,
    isRunning: boolean,
    lastActivated: Date,
    totalRuntimeInMilis: Date,
    type: ServerType
}


