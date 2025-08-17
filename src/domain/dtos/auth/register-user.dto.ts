import { regularExps } from "../../../config";


export class RegisterUserDto {
   private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create (object: { name?: string, email?: string, password?: string }): [string?, RegisterUserDto?] {
        const { name, email, password } = object;

        if (!name) return ['Missing name']
        if (!email) return ['Missing email']
        if (!regularExps.email.test(email)) return ['Invalid email']
        if (!password) return ['Missing password']
        if (password.length < 6) return ['Password must be at least 6 characters long']

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}
