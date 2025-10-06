import { FastifyReply, FastifyRequest } from 'fastify';
import { AppError, ConflictError, NotFoundError, ValidationError } from './AppError';

interface ErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}

export function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
  console.error('Erro capturado:', {
    message: error.message,
    stack: error.stack,
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString()
  });

  if (error instanceof AppError) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
      error: error.name
    };

    return reply.status(error.statusCode).send(errorResponse);
  }

  if (error.name === 'ZodError') {
    const zodError = error as any;
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Invalid data',
      statusCode: 422,
      error: 'ValidationError',
      details: zodError.errors?.map((err: any) => ({
        field: err.path?.join('.'),
        message: err.message
      }))
    };

    return reply.status(422).send(errorResponse);
  }

  if (error.message.includes('ECONNREFUSED') || error.message.includes('database')) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Database connection error',
      statusCode: 503,
      error: 'DatabaseError'
    };

    return reply.status(503).send(errorResponse);
  }

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Invalid or expired token',
      statusCode: 401,
      error: 'AuthenticationError'
    };

    return reply.status(401).send(errorResponse);
  }

  const errorResponse: ErrorResponse = {
    success: false,
    message: 'Internal server error',
    statusCode: 500,
    error: 'InternalServerError'
  };

  return reply.status(500).send(errorResponse);
}

export function createError(message: string, statusCode: number = 400): AppError {
  return new AppError(message, statusCode);
}

export function handleValidationError(errors: any[]): AppError {
  const messages = errors.map(err => `${err.path?.join('.')}: ${err.message}`).join(', ');
  return new ValidationError(messages);
}

export function handleDuplicateError(field: string): AppError {
  return new ConflictError(`${field} already in use`);
}

export function handleNotFoundError(resource: string): AppError {
  return new NotFoundError(`${resource} not found`);
}

export function handleZodError(zodError: any): AppError {
  const errors = zodError.errors?.map((err: any) => {
    const field = err.path?.join('.') || 'campo';
    return `${field}: ${err.message}`;
  }).join(', ') || 'Dados inválidos';
  
  return new ValidationError(errors);
}
