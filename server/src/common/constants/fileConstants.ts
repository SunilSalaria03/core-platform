
export const UPLOAD_TYPES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  SENSITIVE: 'sensitive',
} as const;
  
export const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;