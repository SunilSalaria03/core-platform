// File upload constants
export const UPLOAD_TYPES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  SENSITIVE: 'sensitive',
} as const;

export type UploadType = typeof UPLOAD_TYPES[keyof typeof UPLOAD_TYPES];

// Supported mime types
export const SUPPORTED_MIME_TYPES = {
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  PNG: 'image/png',
  WEBP: 'image/webp',
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
} as const;

export type SupportedMimeType =
  typeof SUPPORTED_MIME_TYPES[keyof typeof SUPPORTED_MIME_TYPES];