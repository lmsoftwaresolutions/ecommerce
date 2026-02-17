// Token storage and decoding helpers

const TOKEN_KEY = 'access_token'

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function decodeToken(token) {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid token format')
    }
    // Decode payload (second part)
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (error) {
    throw new Error('Failed to decode token: ' + error.message)
  }
}
