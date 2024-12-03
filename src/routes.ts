import { Router } from "express";
import { ClienteController } from "./controller/ClienteController";
import { ProdutoController } from "./controller/ProdutoController";
import { FuncionariosController } from "./controller/FuncionarioController";
import { LoginController } from "./controller/LoginController";
import { authMiddleware } from "./middleware/authMiddleware";
import { EstoqueController } from "./controller/EstoqueController";
import { VendasController } from "./controller/VendaController";

const routes = Router()

routes.post('/register', new FuncionariosController().create)
routes.post('/login', new LoginController().login)


routes.use(authMiddleware)

routes.post('/cliente', new ClienteController().create)
routes.get('/cliente', new ClienteController().getCliente)
routes.put('/cliente/:id', new ClienteController().putCliente)
routes.delete('/cliente/:id', new ClienteController().DelCliente)


routes.get('/register', new FuncionariosController().get)
routes.delete('/register/:id', new FuncionariosController().Del)

routes.get('/profile', new LoginController().getprofile)
routes.post('/compra', new EstoqueController().create)

routes.post('/venda', new VendasController().create)
routes.get('/venda', new VendasController().getVenda)

routes.post('/estoque', new ProdutoController().create)
routes.get('/estoque', new ProdutoController().getProduto)
routes.put('/estoque/:id', new ProdutoController().putProduto)
routes.delete('/estoque/:id', new ProdutoController().DelProduto)

export default routes