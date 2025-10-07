import { FastifyRequest, FastifyReply } from 'fastify';

const mockExecute = jest.fn();
jest.mock('@/services/student/CreateStudentService', () => ({
  CreateStudentService: jest.fn().mockImplementation(() => ({
    execute: mockExecute
  }))
}));

import { CreateStudentController } from '@/controllers/students/CreateStudentController';

describe('CreateStudentController', () => {
  let controller: CreateStudentController;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    controller = new CreateStudentController();
    mockRequest = { body: {} };
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  it('deve criar um aluno com dados válidos', async () => {
    const studentData = {
      name: 'João Silva',
      email: 'joao@example.com',
      ra: '123456',
      cpf: '12345678901'
    };

    mockRequest.body = studentData;
    mockExecute.mockResolvedValue({ id: 1, ...studentData });

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockExecute).toHaveBeenCalledWith(studentData);
    expect(mockReply.send).toHaveBeenCalledWith({
      success: true,
      message: 'Aluno criado com sucesso',
      data: { id: 1, ...studentData }
    });
  });

  it('deve rejeitar dados inválidos', async () => {
    mockRequest.body = { name: 'J', email: 'invalido', ra: 'ABC', cpf: '123' };

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow();
  });

  it('deve tratar erro de email duplicado', async () => {
    mockRequest.body = {
      name: 'João Silva',
      email: 'joao@example.com',
      ra: '123456',
      cpf: '12345678901'
    };
    mockExecute.mockRejectedValue(new Error('Email já cadastrado'));

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow('Email já cadastrado');
  });
});
