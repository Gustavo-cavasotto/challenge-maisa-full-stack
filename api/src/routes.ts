
import { FastifyInstance } from 'fastify';
import { AuthController } from '@/controllers/admin/AuthController';
import { GetAllStudentsController } from '@/controllers/students/GetAllStudentsController';
import { GetTotalStudentsController } from '@/controllers/students/GetTotalStudentsController';
import { GetStudentByIdController } from '@/controllers/students/GetStudentByIdController';
import { CreateStudentController } from '@/controllers/students/CreateStudentController';
import { UpdateStudentController } from '@/controllers/students/UpdateStudentController';
import { DeleteStudentController } from '@/controllers/students/DeleteStudentController';
import { isAuthenticated } from './middlewares/auth/isAuthenticated';
import { isAdmin } from './middlewares/auth/isAdmin';

export default async function routes(fastify: FastifyInstance) {
  // --- AUTH ---
  fastify.post('/auth', new AuthController().handle);
  
  // --- STUDENTS ---
  fastify.get('/students', { preHandler: [isAuthenticated] }, new GetAllStudentsController().handle);
  fastify.get('/students/total', { preHandler: [isAuthenticated] }, new GetTotalStudentsController().handle);
  fastify.get('/students/:id', { preHandler: [isAuthenticated] }, new GetStudentByIdController().handle);
  fastify.post('/students', { preHandler: [isAuthenticated, isAdmin] }, new CreateStudentController().handle);
  fastify.put('/students/:id', { preHandler: [isAuthenticated, isAdmin] }, new UpdateStudentController().handle);
  fastify.delete('/students/:id', { preHandler: [isAuthenticated, isAdmin] }, new DeleteStudentController().handle);
}
