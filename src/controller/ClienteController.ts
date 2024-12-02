import { NextFunction, Request, Response } from "express";
import { EnderecosRespository } from "../repository/EnderecoRepository";
import { ClientesRespository } from "../repository/ClienteRepository";
import { Clientes } from "../entity/Cliente";
import { Enderecos } from "../entity/Enderecos";

export class ClienteController {
    async create (req: Request, res: Response, next: NextFunction) {
        try {          
            const {nome,Email,cpf,celular,data_nasc,numero,cep,rua,bairro,cidade,uf} = req.body
            if(!nome || !Email || !cpf || !celular || !data_nasc || !numero || !cep || !rua || !bairro || !cidade || !uf){
                return res.status(400).json({message: "Ensira todos os dados "})
            }
            const cepSemHifen = cep.replace("-", "")
            const newEndereco = EnderecosRespository.create({
                numero,cep: cepSemHifen,bairro,rua,cidade,uf
            })
            const resEndereco = await EnderecosRespository.save(newEndereco)
            const newCliente = ClientesRespository.create({
                nome, Email, cpf, celular, data_nasc, enderecos:resEndereco
            })
            const resCliente = ClientesRespository.save(newCliente)   
            return res.status(200).json(resCliente)
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    async getCliente(req: Request, res: Response, next: NextFunction){
        try {
            const response = await ClientesRespository.find({
                relations: ["enderecos"],
              })
            return res.status(200).json(response)  
        } catch (error) {

            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    async putCliente(req: Request, res: Response, next: NextFunction){
        try {
            const {Email,celular} = req.body
            const {numero,cep,rua,bairro,cidade,uf} = req.body.enderecos


            if( !Email  || !numero || !cep || !celular || !rua || !bairro || !cidade || !uf){
                return res.status(400).json({message: "Ensira todos os dados "})
            }
            const cepSemHifen = cep.replace("-", "")
            const {id} = req.params

            const response = await ClientesRespository.findOneBy({id: id})

            
            if(!id){
                return res.status(400).json({message: "Nao foi possivel achar o produto"})
            }

            const newProduto = await ClientesRespository.update(id,{Email})
            const newEndereco = await EnderecosRespository.update(req.body.enderecos.id,{numero,cep:cepSemHifen,rua,bairro,cidade,uf})

            return res.status(200).json({message: "Dados alterado"})
            
        } catch (error) {

            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    async DelCliente(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params

            if(!id){
                return res.status(400).json({message: "Nao foi possivel Achar o produto"})
            }

            const DelProduto = await ClientesRespository.delete(id)

            return res.status(200).json({message: "Dados Deletado"})
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }

    }
}