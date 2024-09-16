import { Router } from "express";
import { ClienteController } from "./controller/ClienteController";

const routes = Router()

routes.post('/cliente', new ClienteController().create)

export default routes