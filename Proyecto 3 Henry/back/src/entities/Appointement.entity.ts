import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { users } from "./User.entity";
import { EStatus } from "../interfaces/IAppointements";

@Entity({name: "appointements"})
export class Appointement{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date", nullable: false })
    date: Date

    @Column({ type: "varchar", length: 5, nullable: false })
    time: string

    @Column({ type: "varchar", length: 10, nullable: false, default: EStatus.Active })
    status: EStatus

    @Column({ type: "text", nullable: false }) 
    description: string;
    
    @ManyToOne(() => users, user => user.appointements, { nullable: false })
    @JoinColumn()
    user: users

    @CreateDateColumn()
    createdAt?: Date
    
    @UpdateDateColumn()
    UpdateAt?: Date
}