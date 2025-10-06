// Mock do banco de dados para evitar conexões reais durante os testes
jest.mock('@/database/connection', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    where: jest.fn(),
    from: jest.fn(),
    raw: jest.fn(),
    transaction: jest.fn(),
  },
  default: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    where: jest.fn(),
    from: jest.fn(),
    raw: jest.fn(),
    transaction: jest.fn(),
  }
}));

// Mock dos repositórios
jest.mock('@/repositories/StudentRepository');
jest.mock('@/repositories/AdminRepository');

