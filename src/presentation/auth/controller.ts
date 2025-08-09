import { Request, Response } from "express";


export class AuthController {

    constructor() {}

    loginUser(req: Request, res: Response) {

        res.json({
            message: 'Login User'
        })

    }

    registerUser(req: Request, res: Response) {

        res.json({
            message: 'Register User'
        })

    }

    validateEmailUser(req: Request, res: Response) {

        res.json({
            message: 'Validate Email User'
        })

    }
  
}
