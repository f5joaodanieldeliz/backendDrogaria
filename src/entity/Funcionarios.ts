import { Entity, PrimaryGeneratedColumn, Column, Double, OneToMany } from "typeorm"
import { Vendas } from "./Vendas"

@Entity()
export class Funcionarios {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'varchar'})
    usuario: string

    @Column({type: 'varchar'})
    email: string

    @Column({type: 'varchar'})
    senha: string

    @OneToMany(() => Vendas, vendas => vendas.Funcionarios)
    vendas: Vendas[]

}
