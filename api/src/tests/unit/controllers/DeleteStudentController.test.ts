import { FastifyRequest, FastifyReply } from 'fastify';

const mockExecute = jest.fn();
jest.mock('@/services/student/DeleteStudentService', () => ({
  DeleteStudentService: jest.fn().mockImplementation(() => ({
    execute: mockExecute
  }))
}));

import { DeleteStudentController } from '@/controllers/students/DeleteStudentController';

describe('DeleteStudentController', () => {
  let controller: DeleteStudentController;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    controller = new DeleteStudentController();
    mockRequest = { params: {} };
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  it('deve excluir um aluno com sucesso', async () => {
    const deletedStudent = {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com',
      ra: '123456',
      cpf: '12345678901'
    };

    mockRequest.params = { id: '1' };
    mockExecute.mockResolvedValue(deletedStudent);

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockExecute).toHaveBeenCalledWith(1);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Aluno excluído com sucesso',
      student: deletedStudent
    });
  });

  it('deve rejeitar ID inválido', async () => {
    mockRequest.params = { id: 'abc' };

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockReply.code).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ message: 'ID do aluno inválido' });
  });

  it('deve tratar erro de aluno não encontrado', async () => {
    mockRequest.params = { id: '999' };
    mockExecute.mockRejectedValue(new Error('Aluno não encontrado'));

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow('Aluno não encontrado');
  });
});
