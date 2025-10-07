import { StudentRepository } from "@/repositories/StudentRepository";

class DeleteStudentService {
    constructor(private studentRepository: StudentRepository) {}

    async execute(id: number) {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            return null;
        }
        
        const deletedStudent = await this.studentRepository.delete(id);
        return deletedStudent;
    }
}

export { DeleteStudentService };