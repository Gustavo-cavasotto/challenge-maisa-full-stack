import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthenticationError } from '@/errors/AppError';

const mockExecute = jest.fn();
jest.mock('@/services/admin/AuthService', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    execute: mockExecute
  }))
}));

import { AuthController } from '@/controllers/admin/AuthController';

describe('AuthController', () => {
  let controller: AuthController;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    controller = new AuthController();
    mockRequest = { body: {} };
    mockReply = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  it('deve fazer login com credenciais válidas', async () => {
    const loginData = { email: 'admin@example.com', password: 'senha123' };
    const authResult = {
      id: 1,
      name: 'Admin',
      email: 'admin@example.com',
      token: 'mock.jwt.token',
      is_admin: true
    };

    mockRequest.body = loginData;
    mockExecute.mockResolvedValue(authResult);

    await controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockExecute).toHaveBeenCalledWith(loginData);
    expect(mockReply.send).toHaveBeenCalledWith({
      status: 200,
      success: true,
      message: 'Login successful',
      token: authResult.token,
      user: authResult,
      is_admin: true
    });
  });

  it('deve rejeitar credenciais inválidas', async () => {
    mockRequest.body = { email: 'invalido', password: 'ab' };

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow();
  });

  it('deve tratar erro de autenticação', async () => {
    mockRequest.body = { email: 'admin@example.com', password: 'senhaerrada' };
    mockExecute.mockRejectedValue(new AuthenticationError('Usuário ou senha incorretos'));

    await expect(
      controller.handle(mockRequest as FastifyRequest, mockReply as FastifyReply)
    ).rejects.toThrow('Usuário ou senha incorretos');
  });
});
