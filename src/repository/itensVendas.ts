import { IntensVendas } from './../entity/itens_vendas';
import { AppDataSource } from "../data-source";




export const IntensVendasRespository = AppDataSource.getRepository(IntensVendas)