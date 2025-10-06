import { StudentRepository, StudentsPaginationModel } from '@/repositories/StudentRepository';

class GetAllStudentsService {
  async execute(params: StudentsPaginationModel) {
    const result = await new StudentRepository().getAllStudents(params);
    return result;
  }
}

export { GetAllStudentsService };