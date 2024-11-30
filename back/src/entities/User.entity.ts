import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Credential } from "./Credential.entity"
import { Appointement } from "./Appointement.entity"

@Entity({ name: "users"})
export class users{
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: "varchar", length: 100, nullable: false })
    name: string
    
    @Column({ type: "varchar", length: 100, unique: true, nullable: false })
    email: string

    @Column({ type: "date", nullable: false })
    birthdate: Date

    @Column({ type: "integer", nullable: false, unique: true })
    nDni: number
    
    @CreateDateColumn()
    createdAt?: Date
    
    @UpdateDateColumn()
    UpdateAt?: Date
    
    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn()
    credentials: Credential

    @OneToMany(()=>Appointement, appointement => appointement.user)
    @JoinColumn()
    appointements: Appointement[]
}