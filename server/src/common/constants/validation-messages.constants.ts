export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',

  PASSWORD_TOO_WEAK:
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',

  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_MAX_LENGTH: 'Password must not exceed 128 characters',

  NAME_MIN_LENGTH: 'Name must be at least 2 characters long',
  NAME_MAX_LENGTH: 'Name must not exceed 100 characters',
} as const;