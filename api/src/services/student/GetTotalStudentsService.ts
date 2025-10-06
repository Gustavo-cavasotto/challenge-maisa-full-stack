import { StudentRepository } from "@/repositories/StudentRepository";

class GetTotalStudentsService {
    async execute() {
        const totalStudents = await new StudentRepository().getTotalStudents();
        return totalStudents;
    }
}

export { GetTotalStudentsService };