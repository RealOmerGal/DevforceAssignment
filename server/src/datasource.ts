import { DataSource } from "typeorm";
import { Server } from "./entities/Server";
import { ServerType } from "./entities/ServerType";


export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://postgres:postgrespw@localhost:49153",
    synchronize: true,
    ssl: false,
    entities: [Server, ServerType],
    subscribers: [],
    migrations: [],
})

export const serverRepository = AppDataSource.getRepository(Server);
export const serverTypesRepository = AppDataSource.getRepository(ServerType);