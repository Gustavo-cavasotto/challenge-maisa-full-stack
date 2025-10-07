export interface Admin {
  id: number
  name: string
  email: string
  is_admin: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  status: number
  success: boolean
  message: string
  token: string
  user: Admin
}
