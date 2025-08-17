import { LoginUserDto, RegisterUserDto } from "../../domain";
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

    public async loginUser(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({ email: loginUserDto.email });
        
        if (!user) throw new Error('User not found');   
        
        const isPasswordValid = bcryptAdapter.compare(loginUserDto.password, user.password);
        
        if (!isPasswordValid) throw new Error('Invalid password');
        
        const {password, ...rest} = user.toObject();
        return {
            user: rest,
            token: 'token'
            }
    }

    public async validateEmailUser(token: string) { 
        
    }
}