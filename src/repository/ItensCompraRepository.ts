import { AppDataSource } from "../data-source";
import { IntensCompras } from "../entity/itens_compra";

export const itenscompraRespository = AppDataSource.getRepository(IntensCompras)