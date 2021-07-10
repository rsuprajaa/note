const regex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'

export const validEmail = (email: string): boolean => {
  if (email.trim().length > 0 && email.match(regex)) {
    return true
  }
  return false
}

export const validInput = (input: string): boolean => {
  if (input.trim().length > 0) {
    return true
  }
  return false
}

export const validPassword = (password: string): boolean => {
  if (password.trim().length >= 6) {
    return true
  }
  return false
}
