import { NextFunction, Request, Response } from "express";
import { itenscompraRespository } from "../repository/ItensCompraRepository";
import { comprasRespository } from "../repository/ComprasRepository";
import { produtoRepository } from "../repository/ProdutoRepository";
import { IntensVendasRespository } from "../repository/itensVendas";
import { VendasRespository } from "../repository/VendasRepository";



export class VendasController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {          
            const {client, items, date, total, paymentMethod} = req.body
            
            const idfuncionario: any = req.funcionario.id
            
            if(!items || !total || !date || !client || !paymentMethod){
                return res.status(400).json({message: "Ensira todos os dados "})
            }

            const newVenda = VendasRespository.create({
                clientes: client.id,
                Funcionarios: idfuncionario,
                data: date,
                valor: total,
                tipo_pagamento: paymentMethod
            })


            const resVenda = await VendasRespository.save(newVenda)


            for( const iten of items){
                const custo = (iten.preco * iten.quantidade)

                const newItensVenda = IntensVendasRespository.create({
                    custo: custo.toString(), quantidade: iten.quantidade, produtos: iten.id, vendas: resVenda
                })

                const resItensCompra = await IntensVendasRespository.save(newItensVenda)
                const produto = await produtoRepository.findOneBy({id: iten.id})
                const quant = (Number(produto?.quantidade) - Number(iten.quantidade))
                await produtoRepository.update(iten.id, {quantidade:quant})
            }
            return res.status(200).json()
        } catch (error) {

            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    async getVenda(req: Request, res: Response, next: NextFunction){
        try {
            const response = await VendasRespository.find()
            return res.status(200).json(response)  
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}