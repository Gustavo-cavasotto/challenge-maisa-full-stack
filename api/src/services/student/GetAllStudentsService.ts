import { StudentRepository, StudentsPaginationModel } from '@/repositories/StudentRepository';

class GetAllStudentsService {
  constructor(private studentRepository: StudentRepository) {}

  async execute(params: StudentsPaginationModel) {
    const result = await this.studentRepository.getAllStudents(params);
    return result;
  }
}

export { GetAllStudentsService };