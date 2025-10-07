import axios from 'axios'
import type { LoginData, LoginResponse } from '@/types/admin'
import type { CreateStudentData, UpdateStudentData, StudentsListResponse, StudentResponse, TotalStudentsResponse } from '@/types/student'
import type { PaginationParams, PaginatedResponse } from '@/types/pagination'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes('login')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: (data: LoginData): Promise<{ data: LoginResponse }> => 
    api.post('/auth', data)
}

// Students API
export const studentsApi = {
  getAll: (params?: PaginationParams): Promise<{ data: PaginatedResponse<any> }> => 
    api.get('/students', { params }),
  
  getTotal: (): Promise<{ data: TotalStudentsResponse }> => 
    api.get('/students/total'),
  
  getById: (id: number): Promise<{ data: StudentResponse }> =>
    api.get(`/students/${id}`),
  
  create: (data: CreateStudentData): Promise<{ data: StudentResponse }> => 
    api.post('/students', data),
  
  update: (id: number, data: UpdateStudentData): Promise<{ data: StudentResponse }> => 
    api.put(`/students/${id}`, data),
  
  delete: (id: number): Promise<{ data: StudentResponse }> => 
    api.delete(`/students/${id}`)
}

export default api 