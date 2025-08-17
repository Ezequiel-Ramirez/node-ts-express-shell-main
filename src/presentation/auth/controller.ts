import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Something went wrong' });
    }

    loginUser(req: Request, res: Response) {

        res.json({
            message: 'Login User'
        })

    }

    registerUser(req: Request, res: Response) {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        this.authService.registerUser(registerUserDto!)
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            this.handleError(error as CustomError, res);
        })

    }

    validateEmailUser(req: Request, res: Response) {

        res.json({
            message: 'Validate Email User'
        })

    }
  
}
