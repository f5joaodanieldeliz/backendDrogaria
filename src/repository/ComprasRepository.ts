import { AppDataSource } from "../data-source";
import { Compras } from "../entity/compras";


export const comprasRespository = AppDataSource.getRepository(Compras)