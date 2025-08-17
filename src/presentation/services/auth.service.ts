import { RegisterUserDto } from "../../domain";
import { UserModel } from "../../data";
import { CustomError } from "../../domain/errors/custom.error";
import { bcryptAdapter } from "../../config";

export class AuthService {
    constructor() {}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        
        if (existUser) throw new Error('User already exists');

        try {
            const user = new UserModel(registerUserDto);
            //encriptar la contraseña
            user.password = bcryptAdapter.hash(user.password);
            //guardar el usuario
            await user.save();

            const {password, ...rest} = user.toObject();
            return {
                user: rest,
                token: 'token'
                }
        } catch (error) {
            throw CustomError.internal(`${error}`)
        }

    }

    public loginUser() {
        
    }

    public validateEmailUser() {
        
    }
}