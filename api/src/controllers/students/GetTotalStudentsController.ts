import { FastifyRequest, FastifyReply } from "fastify";
import { GetTotalStudentsService } from "@/services/student/GetTotalStudentsService";

class GetTotalStudentsController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const getTotalStudents = await new GetTotalStudentsService().execute();
        return res.send({
            message: 'Total de alunos encontrado com sucesso',
            totalStudents: getTotalStudents
        });
    }
}

export { GetTotalStudentsController };