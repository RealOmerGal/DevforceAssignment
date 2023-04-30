import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServerType } from "./ServerType";

@Entity()
export class Server {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    ipAddress: string

    @Column()
    name: string

    @Column({ default: null, type: 'timestamp without time zone' })
    lastActivated: Date

    @Column({ default: null, type: 'timestamp without time zone' })
    totalRuntimeInMilis: Date


    @Column({ default: false })
    isRunning: boolean

    @ManyToOne(() => ServerType, (serverType) => serverType.servers)
    type: ServerType

}