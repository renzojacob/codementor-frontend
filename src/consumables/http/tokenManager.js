// Token management utilities
export const saveTokens = ({ access_token, refresh_token }) => {
  if (access_token) {
    localStorage.setItem('access_token', access_token)
    const expiresAt = new Date().getTime() + (15 * 60 * 1000) // 15 minutes
    localStorage.setItem('token_expires_at', expiresAt.toString())
  }
  if (refresh_token) {
    localStorage.setItem('refresh_token', refresh_token)
  }
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token_expires_at')
}

export const getAccessToken = () => localStorage.getItem('access_token')
export const getRefreshToken = () => localStorage.getItem('refresh_token')

export const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('token_expires_at')
  if (!expiresAt) return true
  return new Date().getTime() > parseInt(expiresAt)
}

export const refreshToken = async () => {
  const refresh_token = getRefreshToken()
  if (!refresh_token) return false

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/refresh`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token }),
      }
    )

    if (!response.ok) return false

    const data = await response.json()
    saveTokens(data)
    return true
  } catch {
    clearTokens()
    return false
  }
}