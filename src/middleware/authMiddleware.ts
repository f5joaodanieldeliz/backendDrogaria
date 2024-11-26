import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

type JwtPaylode = {
    id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let { authorization } = req.headers

    if(!authorization?.length) {
        authorization = ''
    }

    const token = authorization.split(' ')[1]

    const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPaylode

}