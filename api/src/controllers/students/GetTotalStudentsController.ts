import { FastifyRequest, FastifyReply } from "fastify";
import { GetTotalStudentsService } from "@/services/student/GetTotalStudentsService";
import { StudentRepository } from "@/repositories/StudentRepository";

class GetTotalStudentsController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const studentRepository = new StudentRepository();
        const getTotalStudentsService = new GetTotalStudentsService(studentRepository);
        const getTotalStudents = await getTotalStudentsService.execute();
        return res.send({
            message: 'Total de alunos encontrado com sucesso',
            totalStudents: getTotalStudents
        });
    }
}

export { GetTotalStudentsController };