import { StudentRepository, UpdateStudentModel } from "@/repositories/StudentRepository";
import { ConflictError, NotFoundError } from "@/errors/AppError";

class UpdateStudentService {
    constructor(private studentRepository: StudentRepository) {}

    async execute(data: UpdateStudentModel) {
        const student = await this.studentRepository.findById(data.id);
        if (!student) {
            throw new NotFoundError('Aluno não encontrado');
        }
        
        const existingStudentByEmail = await this.studentRepository.findByEmail(data.email);
        if (existingStudentByEmail && existingStudentByEmail.id !== data.id) {
            throw new ConflictError('Email já cadastrado por outro aluno');
        }
        
        const updatedStudent = await this.studentRepository.update(data.id, data);
        return updatedStudent;
    }
}

export { UpdateStudentService };