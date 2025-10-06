import { z } from 'zod';

const createStudentModel = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
    email: z.string().email('Email inválido'),
    ra: z.string()
        .min(1, 'RA é obrigatório')
        .max(20, 'RA deve ter no máximo 20 caracteres')
        .regex(/^[0-9]+$/, 'RA deve conter apenas números'),
    cpf: z.string().regex(/^[0-9]{11}$/, 'CPF deve ter 11 dígitos'),
});

const updateStudentModel = z.object({
    id: z.number().min(1, { message: "ID do aluno é obrigatório" }),
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
    email: z.string().email('Email inválido'),
    // RA e CPF não são editáveis
});

const studentsPaginationModel = z.object({
    page: z.number().min(1, 'Página deve ser maior que 0').default(1),
    limit: z.number().min(1, 'Limite deve ser maior que 0').max(100, 'Limite maximo e 100').default(10),
    search: z.string().optional(),
});

export { createStudentModel, updateStudentModel, studentsPaginationModel };