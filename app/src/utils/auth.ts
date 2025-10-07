interface JWTPayload {
  name: string
  email: string
  sub: string
  iat: number
  exp: number
  [key: string]: any
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) return true

  const now = Math.floor(Date.now() / 1000)
  return payload.exp < now
}

export const getStoredToken = (): string | null => {
  return localStorage.getItem('token')
}

// esta verificação é apenas para UX. A segurança real está no backend.
export const isUserAdmin = (): boolean => {
  try {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const userData = JSON.parse(userStr)
      if (userData.is_admin === 1 || userData.is_admin === true) {
        return true
      }
    }

    const token = getStoredToken()
    if (!token) return false

    if (isTokenExpired(token)) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    }

    const payload = decodeJWT(token)
    if (payload && payload.is_admin) {
      return true
    }

    return false
  } catch {
    return false
  }
}

export const clearAuth = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const isAuthenticated = (): boolean => {
  const token = getStoredToken()
  if (!token) return false
  
  return !isTokenExpired(token)
}
