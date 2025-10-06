import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  
  await knex('admins').del();

  const admins = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@maisaedu.com.br',
      password: await bcrypt.hash('admin123', 10),
      is_admin: true,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Coordinator',
      email: 'coordenador@maisaedu.com.br',
      password: await bcrypt.hash('coord123', 10),
      is_admin: false,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Secretary',
      email: 'secretario@maisaedu.com.br',
      password: await bcrypt.hash('secret123', 10),
      is_admin: false,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  await knex('admins').insert(admins);
}
