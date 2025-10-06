import { FastifyReply, FastifyRequest } from "fastify";
import { AdminRepository } from "@/repositories/AdminRepository";
import { UnauthorizedError } from "@/errors/AppError";

export async function isAdmin(req: FastifyRequest, res: FastifyReply) {
    const user = req.user_id;
    if (!user) {
        throw new UnauthorizedError('Usuário não autorizado');
    }
    const admin = await new AdminRepository().findById(Number(user));
    if (!admin || !admin.is_admin) {
        console.log('Usuário não autorizado');
        console.log(admin);
        throw new UnauthorizedError('Usuário não autorizado');
    }
    return;
}
