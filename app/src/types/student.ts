export interface Student {
  id: number
  name: string
  email: string
  ra: string
  cpf: string
  created_at: string
  updated_at: string
}

export interface CreateStudentData {
  name: string
  email: string
  ra: string
  cpf: string
}

export interface UpdateStudentData {
  id: number
  name: string
  email: string
}

export interface DeleteStudentData {
  id: number
}

export interface StudentResponse {
  success: boolean
  message: string
  data: Student
}

export interface StudentsListResponse {
  success: boolean
  message: string
  students: Student[]
}

export interface TotalStudentsResponse {
  success: boolean
  message: string
  totalStudents: number
}
