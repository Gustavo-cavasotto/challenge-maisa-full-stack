import { FastifyRequest, FastifyReply } from 'fastify';
import { BadRequestError, NotFoundError } from '@/errors/AppError';

const mockFindById = jest.fn();
jest.mock('@/repositories/StudentRepository', () => ({
  StudentRepository: jest.fn().mockImplementation(() => ({
    findById: mockFindById
  }))
}));

import { GetStudentByIdController } from '@/controllers/students/GetStudentByIdController';

describe('GetStudentByIdController', () => {
  let controller: GetStudentByIdController;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    controller = new GetStudentByIdController();
    mockRequest = { params: {} };
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  it('deve retornar um aluno por ID', async () => {
    const student = {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com',
      ra: '123456',
      cpf: '12345678901'
    };

    mockRequest.params = { id: '1' };
    mockFindById.mockResolvedValue(student);

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockFindById).toHaveBeenCalledWith(1);
    expect(mockReply.send).toHaveBeenCalledWith({
      success: true,
      message: 'Aluno encontrado com sucesso',
      student
    });
  });

  it('deve rejeitar ID inválido', async () => {
    mockRequest.params = { id: 'abc' };

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow(BadRequestError);
  });

  it('deve lançar erro quando aluno não existir', async () => {
    mockRequest.params = { id: '999' };
    mockFindById.mockResolvedValue(null);

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow(NotFoundError);
  });
});
