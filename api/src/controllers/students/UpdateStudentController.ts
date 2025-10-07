import { updateStudentModel } from "@/models/Student";
import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateStudentService } from "@/services/student/UpdateStudentService";
import { StudentRepository } from "@/repositories/StudentRepository";

class UpdateStudentController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const student = updateStudentModel.parse(req.body);
        const studentRepository = new StudentRepository();
        const updateStudentService = new UpdateStudentService(studentRepository);
        const updatedStudent = await updateStudentService.execute(student);
        
        return res.send({
            message: 'Aluno atualizado com sucesso',
            student: updatedStudent
        });
    }
}

export { UpdateStudentController };