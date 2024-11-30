import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { users } from "./User.entity";

@Entity({name: "credentials"})
export class Credential{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100, unique: true, nullable: false })
    username: string

    @Column({ type: "varchar", length: 100, nullable: false })
    password: string

    @CreateDateColumn()
    createdAt?: Date
    
    @UpdateDateColumn()
    UpdateAt?: Date

    @OneToOne(() => users)
    user: users
}