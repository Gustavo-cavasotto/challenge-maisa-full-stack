import { StudentRepository, CreateStudentModel } from "@/repositories/StudentRepository";
import { ConflictError } from "@/errors/AppError";

class CreateStudentService {
    constructor(private studentRepository: StudentRepository) {}

    async execute(data: CreateStudentModel) {
        const existingStudentByEmail = await this.studentRepository.findByEmail(data.email);
        if (existingStudentByEmail) {
            throw new ConflictError('Email já cadastrado');
        }

        const existingStudentByRA = await this.studentRepository.findByRA(data.ra);
        if (existingStudentByRA) {
            throw new ConflictError('RA já cadastrado');
        }

        const existingStudentByCPF = await this.studentRepository.findByCPF(data.cpf);
        if (existingStudentByCPF) {
            throw new ConflictError('CPF já cadastrado');
        }

        const student = await this.studentRepository.create(data);
        return student;
    }
}

export { CreateStudentService };