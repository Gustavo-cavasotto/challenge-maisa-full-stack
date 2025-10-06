import { StudentRepository, UpdateStudentModel } from "@/repositories/StudentRepository";
import { ConflictError, NotFoundError } from "@/errors/AppError";

class UpdateStudentService {
    async execute(data: UpdateStudentModel) {
        const studentRepository = new StudentRepository();
                
        const student = await studentRepository.findById(data.id);
        if (!student) {
            throw new NotFoundError('Aluno não encontrado');
        }
        
        const existingStudentByEmail = await studentRepository.findByEmail(data.email);
        if (existingStudentByEmail && existingStudentByEmail.id !== data.id) {
            throw new ConflictError('Email já cadastrado por outro aluno');
        }
        
        const updatedStudent = await studentRepository.update(data.id, data);
        return updatedStudent;
    }
}

export { UpdateStudentService };