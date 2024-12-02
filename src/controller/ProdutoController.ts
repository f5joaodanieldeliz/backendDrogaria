import { NextFunction, Request, Response } from "express";
import { produtoRepository } from "../repository/ProdutoRepository";
import { itenscompraRespository } from "../repository/ItensCompraRepository";

export class ProdutoController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {          
            const {nome, categoria ,preco ,quantidade, laboratorio, farmacia_pop, receita, codigo_de_barra} = req.body

            
            if(!nome || !preco || !quantidade || !laboratorio || !codigo_de_barra || !categoria ){
                return res.status(400).json({message: "Ensira todos os dados "})
            }

            const newProduto = produtoRepository.create({
                nome, categoria, preco,
                quantidade, laboratorio, 
                farmacia_pop, receita, codigo_de_barra
            })

            await produtoRepository.save(newProduto)

            return res.status(200).json(newProduto)
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getProduto(req: Request, res: Response, next: NextFunction){
        try {
            const response = await produtoRepository.find()
            return res.status(200).json(response)  
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async putProduto(req: Request, res: Response, next: NextFunction){
        try {
            const {nome, categoria ,preco ,quantidade, laboratorio, farmacia_pop, receita} = req.body
            const {id} = req.params
          
            if(!nome && !categoria && !preco && !quantidade && !laboratorio ){
                return res.status(400).json({message: "Ensira todos os dados "})
            }

            if(!id){
                return res.status(400).json({message: "Nao foi possivel achar o produto"})
            }

            const newProduto = await produtoRepository.update(id,{nome,categoria,preco,quantidade,laboratorio,farmacia_pop,receita})

            return res.status(200).json({message: "Dados alterado"})
            
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async DelProduto(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params

            if(!id){
                return res.status(400).json({message: "Nao foi possivel Achar o produto"})
            }
        
            const a = await itenscompraRespository.findOneBy({produtos: req.params})

            if(a && a.id) {
                await itenscompraRespository.delete(a.id)
                const DelProduto = await produtoRepository.delete(id)
            }
            
            const DelProduto = await produtoRepository.delete(id)

            return res.status(200).json({message: "Dados Deletado"})
        } catch (error) {

            return res.status(500).json({message: "Internal Server Error"})
        }

    }
}