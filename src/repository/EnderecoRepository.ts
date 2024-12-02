import { AppDataSource } from "../data-source";
import { Enderecos } from "../entity/Enderecos";



export const EnderecosRespository = AppDataSource.getRepository(Enderecos)