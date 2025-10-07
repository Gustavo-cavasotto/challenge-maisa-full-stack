import { db } from "@/database/connection";
import { createStudentModel, updateStudentModel, studentsPaginationModel } from "../models/Student";
import { z } from "zod";
import { PaginationHelper, PaginationParams, PaginationResult } from "../utils/pagination";

export type CreateStudentModel = z.infer<typeof createStudentModel>;	
export type UpdateStudentModel = z.infer<typeof updateStudentModel>;
export type StudentsPaginationModel = z.infer<typeof studentsPaginationModel>;

export class StudentRepository {
  async getAllStudents(params: StudentsPaginationModel): Promise<PaginationResult<any>> {
    const validatedParams = PaginationHelper.validateParams(params);
    const offset = PaginationHelper.calculateOffset(validatedParams.page, validatedParams.limit);
    
    // Query base
    let query = db('students').where('is_active', true);
    
    if (validatedParams.search) {
      query = query.where(function() {
        this.where('name', 'like', `%${validatedParams.search}%`)
            .orWhere('email', 'like', `%${validatedParams.search}%`)
            .orWhere('ra', 'like', `%${validatedParams.search}%`)
            .orWhere('cpf', 'like', `%${validatedParams.search}%`);
      });
    }
    
    const totalQuery = query.clone();
    const totalResult = await totalQuery.count('id as count').first();
    const total = Number(totalResult?.count || 0);
    
    // Buscar dados paginados
    const students = await query
      .select('*')
      .orderBy('created_at', 'desc')
      .limit(validatedParams.limit)
      .offset(offset);
    
    return PaginationHelper.buildPaginationResult(
      students,
      total,
      validatedParams.page,
      validatedParams.limit
    );
  }

  async findById(id: number) {
    const student = await db('students').where({ id, is_active: true }).first();
    return student;
  }

  async findByEmail(email: string) {
    const student = await db('students').where({ email, is_active: true }).first();
    return student;
  }

  async findByRA(ra: string) {
    const student = await db('students').where({ ra, is_active: true }).first();
    return student;
  }

  async findByCPF(cpf: string) {
    const student = await db('students').where({ cpf, is_active: true }).first();
    return student;
  }

  async create(data: CreateStudentModel) {
    const [insertedId] = await db('students').insert(data);
    const student = await db('students').where({ id: insertedId }).first();
    return student;
  }
  
  async update(id: number, data: UpdateStudentModel) {
    await db('students').where({ id }).update(data);
    const student = await db('students').where({ id }).first();
    return student;
  }
  
  async delete(id: number) {
    // Soft delete: não deletar o aluno, apenas desativar
    await db('students').where({ id }).update({ is_active: false });
    const student = await db('students').where({ id }).first();
    return student;
  }

  async getTotalStudents() {
    const result = await db('students').where('is_active', true).count('id as count').first();
    return Number(result?.count || 0);
  }
}