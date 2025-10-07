import { FastifyRequest, FastifyReply } from 'fastify';

const mockExecute = jest.fn();
jest.mock('@/services/student/GetAllStudentsService', () => ({
  GetAllStudentsService: jest.fn().mockImplementation(() => ({
    execute: mockExecute
  }))
}));

import { GetAllStudentsController } from '@/controllers/students/GetAllStudentsController';

describe('GetAllStudentsController', () => {
  let controller: GetAllStudentsController;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    controller = new GetAllStudentsController();
    mockRequest = { query: {} };
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  it('deve retornar lista de alunos com paginação', async () => {
    const mockResult = {
      data: [
        { id: 1, name: 'João Silva', email: 'joao@example.com', ra: '123456', cpf: '12345678901' }
      ],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 }
    };

    mockRequest.query = { page: '1', limit: '10', search: '' };
    mockExecute.mockResolvedValue(mockResult);

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockExecute).toHaveBeenCalledWith({ page: 1, limit: 10, search: undefined });
    expect(mockReply.send).toHaveBeenCalledWith({
      success: true,
      message: 'Alunos encontrados com sucesso',
      ...mockResult
    });
  });

  it('deve buscar alunos com termo de pesquisa', async () => {
    const mockResult = {
      data: [{ id: 1, name: 'João', email: 'joao@example.com', ra: '123456', cpf: '12345678901' }],
      pagination: { page: 1, limit: 5, total: 1, totalPages: 1 }
    };

    mockRequest.query = { page: '1', limit: '5', search: 'João' };
    mockExecute.mockResolvedValue(mockResult);

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockExecute).toHaveBeenCalledWith({ page: 1, limit: 5, search: 'João' });
  });
});
