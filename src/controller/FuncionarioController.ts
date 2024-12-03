import  jwt  from 'jsonwebtoken';
import { Request, Response } from "express";
import { funcionariosRespository } from "../repository/FuncionarioRepository";
import bcrypt from 'bcrypt'

export class FuncionariosController {
    async create(req: Request, res: Response) {
        try {
            const {usuario, email, senha, nome, cpf, celular, cargo, salario, data_contratacao} = req.body

            const uemailExist = await funcionariosRespository.findOneBy({ email })
            const senhaExist = await funcionariosRespository.findOneBy({ senha })

            if (uemailExist){
                return res.status(400).json({message: "Email ou senha ja cadastrado "})
            } 

            if(!usuario || !email || !senha || !nome || !cpf || !celular || !cargo || !salario || !data_contratacao) {
                return res.status(400).json({message: "Campo nao prenchido"})
            }

            if (senhaExist){
                return res.status(400).json({message: "Email ou senha ja cadastrado "})
            } 

            const hashPassword = await bcrypt.hash(senha, 10)
            const newFuncionario = funcionariosRespository.create({
                usuario, 
                email,
                nome,
                celular, 
                cpf, 
                cargo, 
                salario, 
                data_contratacao,  
                senha: hashPassword
            })
        
            await funcionariosRespository.save(newFuncionario)

            const {senha: _, ...funcionario} = newFuncionario
            res.status(201).json(funcionario)

        } catch (error) { 

            res.status(400).json(error) 
        }
    }
    async get(req: Request, res: Response) {
        try {
            const response = await funcionariosRespository.find({relations: ["vendas"]})
            return res.status(200).json(response)  
        } catch (error) { 
            res.status(400).json(error) 
        }
    }
    async Del(req: Request, res: Response){
        try {
            const {id} = req.params

            if(!id){
                return res.status(400).json({message: "Nao foi possivel Achar o produto"})
            }

            const DelProduto = await funcionariosRespository.delete(id)

            return res.status(200).json({message: "Dados Deletado"})
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}