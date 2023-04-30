import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Server } from "./Server";

@Entity()
export class ServerType {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    pricePerMinute: number

    @OneToMany(() => Server, (server) => server.type)
    servers: Server[]

}