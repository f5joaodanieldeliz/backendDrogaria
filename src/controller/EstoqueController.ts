import { NextFunction, Request, Response } from "express";
import { itenscompraRespository } from "../repository/ItensCompraRepository";
import { comprasRespository } from "../repository/ComprasRepository";
import { produtoRepository } from "../repository/ProdutoRepository";



export class EstoqueController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {          
            const {items,total,date} = req.body
            if(!items || !total || !date){
                return res.status(400).json({message: "Ensira todos os dados "})
            }
            const newComra = comprasRespository.create({
                data: date,
                valor: total
            })
            const resCompra = await comprasRespository.save(newComra)
            for( const iten of items){
                const newItensCompra = itenscompraRespository.create({
                    custo: total,
                    quantidade: iten.quantidade,
                    compras: resCompra ,
                    produtos: iten.id,
                })
                const resItensCompra = await itenscompraRespository.save(newItensCompra)
                const produto = await produtoRepository.findOneBy({id: iten.id})
                const quant = (Number(produto?.quantidade) + Number(iten.quantidade))
                await produtoRepository.update(iten.id, {quantidade:quant})
            }
            return res.status(200).json()
        } catch (error) {

            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}