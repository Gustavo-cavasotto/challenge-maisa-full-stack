import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteStudentService } from "@/services/student/DeleteStudentService";

class DeleteStudentController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const { id } = req.params as { id: string };
        const studentId = parseInt(id);
        
        if (isNaN(studentId)) {
            return res.code(400).send({ message: 'ID do aluno inválido' });
        }
        
        const deletedStudent = await new DeleteStudentService().execute(studentId);
        
        return res.send({
            message: 'Aluno excluído com sucesso',
            student: deletedStudent
        });
    }
}

export { DeleteStudentController };