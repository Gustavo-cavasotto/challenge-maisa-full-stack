import { FastifyRequest, FastifyReply } from "fastify";
import { CreateStudentService } from "@/services/student/CreateStudentService";
import { StudentRepository } from "@/repositories/StudentRepository";
import { createStudentModel } from "@/models/Student";

class CreateStudentController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const student = createStudentModel.parse(req.body);
        const studentRepository = new StudentRepository();
        const createStudentService = new CreateStudentService(studentRepository);
        const result = await createStudentService.execute(student);
        
        return res.send({
            success: true,
            message: 'Aluno criado com sucesso',
            data: result
        });
    }
}

export { CreateStudentController };