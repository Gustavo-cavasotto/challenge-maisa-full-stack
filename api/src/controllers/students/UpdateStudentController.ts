import { updateStudentModel } from "@/models/Student";
import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateStudentService } from "@/services/student/UpdateStudentService";

class UpdateStudentController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const student = updateStudentModel.parse(req.body);
        const updatedStudent = await new UpdateStudentService().execute(student);
        
        return res.send({
            message: 'Aluno atualizado com sucesso',
            student: updatedStudent
        });
    }
}

export { UpdateStudentController };