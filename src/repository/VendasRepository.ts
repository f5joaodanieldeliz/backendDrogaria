import { IntensVendas } from './../entity/itens_vendas';
import { AppDataSource } from "../data-source";
import { Vendas } from '../entity/Vendas';




export const VendasRespository = AppDataSource.getRepository(Vendas)