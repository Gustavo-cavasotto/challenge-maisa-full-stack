import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AdminRepository } from "@/repositories/AdminRepository";
import { AuthenticationError } from "@/errors/AppError";

interface AuthRequest {
    email: string;
    password: string;
}   

class AuthService {
    async execute({ email, password }: AuthRequest){
        const user = await new AdminRepository().findByEmail(email);
        if (!user){
            console.log("User/password incorrect");
            throw new AuthenticationError("Usuário ou senha incorretos");
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch){''
            console.log("User/password incorrect");
            throw new AuthenticationError("Usuário ou senha incorretos");
        }

        const secret = process.env.JWT_SECRET;
        if (!secret){
            throw new AuthenticationError("JWT_SECRET not configured");
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            secret,
            {
                subject: String(user.id),
                expiresIn: '30d'
            }
        )
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            is_admin: user.is_admin
        };
    }
}

export { AuthService };