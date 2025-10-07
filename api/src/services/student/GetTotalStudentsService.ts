import { StudentRepository } from "@/repositories/StudentRepository";

class GetTotalStudentsService {
    constructor(private studentRepository: StudentRepository) {}

    async execute() {
        const totalStudents = await this.studentRepository.getTotalStudents();
        return totalStudents;
    }
}

export { GetTotalStudentsService };