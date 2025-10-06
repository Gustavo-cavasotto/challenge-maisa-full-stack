import { FastifyReply, FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

interface JwtPayloadSub {
  sub: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user_id?: string;
  }
}

export async function isAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.code(401).send({ error: 'Token is required' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (!/^Bearer$/i.test(scheme) || !token) {
    return reply.code(401).send({ error: 'Malformed authorization header' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      request.log.error('JWT_SECRET is missing');
      return reply.code(500).send({ error: 'Token configuration is missing' });
    }

    const { sub } = verify(token, secret) as JwtPayloadSub;
    request.user_id = sub;
    return;
  } catch (error) {
    request.log.warn({ err: error }, 'Token validation failed');
    return reply.code(401).send({ error: 'Token invalid' });
  }
}