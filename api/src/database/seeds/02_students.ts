import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  
  await knex('students').del();

  const students = [
    {
      id: 1,
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      ra: '2024001',
      cpf: '12345678901',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Vito',
      email: 'vito@gmail.com',
      ra: '2024002',
      cpf: '98765432109',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Pedro',
      email: 'pedro@gmail.com',
      ra: '2024003',
      cpf: '11122233344',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Ana',
      email: 'ana@gmail.com',
      ra: '2024004',
      cpf: '55566677788',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: 'Carlos',
      email: 'carlos@gmail.com',
      ra: '2024005',
      cpf: '99988877766',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 6,
      name: 'Maria',
      email: 'maria@gmail.com',
      ra: '2024006',
      cpf: '12345678902',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 7,
      name: 'João',
      email: 'joao@gmail.com',
      ra: '2024007',
      cpf: '12345678903',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 8,
      name: 'Fernanda',
      email: 'fernanda@gmail.com',
      ra: '2024008',
      cpf: '12345678904',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 9,
      name: 'Rafael',
      email: 'rafael@gmail.com',
      ra: '2024009',
      cpf: '12345678905',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 10,
      name: 'Juliana',
      email: 'juliana@gmail.com',
      ra: '2024010',
      cpf: '12345678906',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 11,
      name: 'Lucas',
      email: 'lucas@gmail.com',
      ra: '2024011',
      cpf: '12345678907',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 12,
      name: 'Camila',
      email: 'camila@gmail.com',
      ra: '2024012',
      cpf: '12345678908',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 13,
      name: 'Diego',
      email: 'diego@gmail.com',
      ra: '2024013',
      cpf: '12345678909',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 14,
      name: 'Beatriz',
      email: 'beatriz@gmail.com',
      ra: '2024014',
      cpf: '12345678910',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 15,
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      ra: '2024015',
      cpf: '12345678911',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 16,
      name: 'Larissa',
      email: 'larissa@gmail.com',
      ra: '2024016',
      cpf: '12345678912',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 17,
      name: 'Bruno',
      email: 'bruno@gmail.com',
      ra: '2024017',
      cpf: '12345678913',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 18,
      name: 'Natália',
      email: 'natalia@gmail.com',
      ra: '2024018',
      cpf: '12345678914',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 19,
      name: 'Thiago',
      email: 'thiago@gmail.com',
      ra: '2024019',
      cpf: '12345678915',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 20,
      name: 'Isabela',
      email: 'isabela@gmail.com',
      ra: '2024020',
      cpf: '12345678916',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
  ];

  await knex('students').insert(students);
}
