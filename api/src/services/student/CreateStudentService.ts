import { StudentRepository, CreateStudentModel } from "@/repositories/StudentRepository";
import { ConflictError } from "@/errors/AppError";

class CreateStudentService {
    async execute(data: CreateStudentModel) {
        const studentRepository = new StudentRepository();
        
        const existingStudentByEmail = await studentRepository.findByEmail(data.email);
        if (existingStudentByEmail) {
            throw new ConflictError('Email já cadastrado');
        }

        const existingStudentByRA = await studentRepository.findByRA(data.ra);
        if (existingStudentByRA) {
            throw new ConflictError('RA já cadastrado');
        }

        const existingStudentByCPF = await studentRepository.findByCPF(data.cpf);
        if (existingStudentByCPF) {
            throw new ConflictError('CPF já cadastrado');
        }

        const student = await studentRepository.create(data);
        return student;
    }
}

export { CreateStudentService };