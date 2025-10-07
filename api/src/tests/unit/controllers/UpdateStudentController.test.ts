import { FastifyRequest, FastifyReply } from 'fastify';

const mockExecute = jest.fn();
jest.mock('@/services/student/UpdateStudentService', () => ({
  UpdateStudentService: jest.fn().mockImplementation(() => ({
    execute: mockExecute
  }))
}));

import { UpdateStudentController } from '@/controllers/students/UpdateStudentController';

describe('UpdateStudentController', () => {
  let controller: UpdateStudentController;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    controller = new UpdateStudentController();
    mockRequest = { body: {} };
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  it('deve atualizar um aluno com dados válidos', async () => {
    const updateData = { id: 1, name: 'João Silva Atualizado', email: 'joao.novo@example.com' };
    const updatedStudent = { ...updateData, ra: '123456', cpf: '12345678901' };

    mockRequest.body = updateData;
    mockExecute.mockResolvedValue(updatedStudent);

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockExecute).toHaveBeenCalledWith(updateData);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Aluno atualizado com sucesso',
      student: updatedStudent
    });
  });

  it('deve rejeitar dados inválidos', async () => {
    mockRequest.body = { id: 0, name: 'J', email: 'invalido' };

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow();
  });

  it('deve tratar erro de aluno não encontrado', async () => {
    mockRequest.body = { id: 999, name: 'João Silva', email: 'joao@example.com' };
    mockExecute.mockRejectedValue(new Error('Aluno não encontrado'));

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow('Aluno não encontrado');
  });
});
