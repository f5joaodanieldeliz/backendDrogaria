import { AppDataSource } from "../data-source";
import { Clientes } from "../entity/Cliente";



export const ClientesRespository = AppDataSource.getRepository(Clientes)