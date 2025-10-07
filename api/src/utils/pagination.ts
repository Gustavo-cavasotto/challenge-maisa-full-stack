// Utilitário de paginação reutilizável
export interface PaginationParams {
  page: number
  limit: number
  search?: string
}

export interface PaginationResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export class PaginationHelper {
  static parseQueryParams(query: any): PaginationParams {
    return {
      page: query.page ? parseInt(query.page.toString()) : 1,
      limit: query.limit ? parseInt(query.limit.toString()) : 10,
      search: query.search?.toString().trim() || undefined
    }
  }

  static validateParams(params: PaginationParams): PaginationParams {
    const page = Math.max(1, params.page || 1)
    const limit = Math.min(100, Math.max(1, params.limit || 10))
    
    return {
      page,
      limit,
      search: params.search?.trim() || undefined
    }
  }

  static calculateOffset(page: number, limit: number): number {
    return (page - 1) * limit
  }

  static calculateTotalPages(total: number, limit: number): number {
    return Math.ceil(total / limit)
  }

  static buildPaginationResult<T>(
    data: T[],
    total: number,
    page: number,
    limit: number
  ): PaginationResult<T> {
    const totalPages = this.calculateTotalPages(total, limit)
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }
  }
}
