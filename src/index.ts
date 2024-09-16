import 'express-async-errors'
import { AppDataSource } from "./data-source"
import express from 'express'
import routes from './routes'

AppDataSource.initialize().then(async () => {
    const app = express()

    app.use(express.json())

    app.use(routes)

    return app.listen(process.env.PORT)

}).catch(error => console.log(error))
