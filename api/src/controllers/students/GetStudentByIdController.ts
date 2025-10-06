import { FastifyReply, FastifyRequest } from 'fastify';
import { StudentRepository } from '@/repositories/StudentRepository';
import { BadRequestError, NotFoundError } from '@/errors/AppError';

class GetStudentByIdController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id?: string };
    const parsedId = Number(id);

    if (!id || Number.isNaN(parsedId)) {
      throw new BadRequestError('ID do aluno inválido');
    }

    const repository = new StudentRepository();
    const student = await repository.findById(parsedId);

    if (!student) {
      throw new NotFoundError('Aluno não encontrado');
    }

    return res.send({ success: true, message: 'Aluno encontrado com sucesso', student });
  }
}

export { GetStudentByIdController };


