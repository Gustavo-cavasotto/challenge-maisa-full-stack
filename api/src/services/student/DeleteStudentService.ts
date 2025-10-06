import { StudentRepository } from "@/repositories/StudentRepository";

class DeleteStudentService {
    async execute(id: number) {
        const studentRepository = new StudentRepository();
                
        const student = await studentRepository.findById(id);
        if (!student) {
            return null;
        }
        
        const deletedStudent = await studentRepository.delete(id);
        return deletedStudent;
    }
}

export { DeleteStudentService };