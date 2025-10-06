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
    }
  ];

  await knex('students').insert(students);
}
