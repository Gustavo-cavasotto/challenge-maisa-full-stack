import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import routes from '@/routes';
import { errorHandler } from '@/errors/errorHandler';

// Load environment variables
dotenv.config();

const fastify = Fastify({
  logger: true
});

// Register CORS
fastify.register(cors as any, {
  origin: true
});

// Register error handler
fastify.setErrorHandler(errorHandler);

// Register routes with /api prefix
fastify.register(routes, { prefix: '/api' });

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`Server running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
