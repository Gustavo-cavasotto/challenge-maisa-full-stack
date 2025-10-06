import { GetAllStudentsService } from "@/services/student/GetAllStudentsService";
import { FastifyReply, FastifyRequest } from "fastify";
import { PaginationHelper } from "@/utils/pagination";

class GetAllStudentsController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        const parsedParams = PaginationHelper.parseQueryParams(req.query);
        const validatedParams = PaginationHelper.validateParams(parsedParams);
        
        const result = await new GetAllStudentsService().execute(validatedParams);
        
        return res.send({
            success: true,
            message: 'Alunos encontrados com sucesso',
            ...result
        });
    }
}

export { GetAllStudentsController };