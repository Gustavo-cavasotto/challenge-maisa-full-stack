import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "@/services/admin/AuthService";
import { AdminRepository } from "@/repositories/AdminRepository";
import { loginModel } from "@/models/Admin";

class AuthController {
    async handle(req: FastifyRequest, res: FastifyReply){
        const validatedData = loginModel.parse(req.body);

        const adminRepository = new AdminRepository();
        const authService = new AuthService(adminRepository);
        const auth = await authService.execute({ email: validatedData.email, password: validatedData.password });

        return res.send({
            status: 200,
            success: true,
            message: "Login successful",
            token: auth.token,
            user: auth,
            is_admin: auth.is_admin
        });
    }
}

export { AuthController };