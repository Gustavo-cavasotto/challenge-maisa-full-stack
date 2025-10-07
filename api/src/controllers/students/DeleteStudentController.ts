import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteStudentService } from "@/services/student/DeleteStudentService";
import { StudentRepository } from "@/repositories/StudentRepository";

class DeleteStudentController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const { id } = req.params as { id: string };
        const studentId = parseInt(id);
        
        if (isNaN(studentId)) {
            return res.code(400).send({ message: 'ID do aluno inválido' });
        }
        
        const studentRepository = new StudentRepository();
        const deleteStudentService = new DeleteStudentService(studentRepository);
        const deletedStudent = await deleteStudentService.execute(studentId);
        
        return res.send({
            message: 'Aluno excluído com sucesso',
            student: deletedStudent
        });
    }
}

export { DeleteStudentController };