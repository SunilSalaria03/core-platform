import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class FileUploadService {

  SingleFile(
    file: { fieldname: string; originalname: string; encoding: string; mimetype: string; size: number; destination: string; filename: string; path: string; buffer: Buffer },
  ): string {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      return `https://example.com/uploads/${file.filename}`;
    } catch (error) {
      console.error('File upload error:', error);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  MultipleFiles(
      files: { fieldname: string; originalname: string; encoding: string; mimetype: string; size: number; destination: string; filename: string; path: string; buffer: Buffer }[],
  ) {
    if (!Array.isArray(files) || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
  }

  private getUploadFolder(mimeType: string): string {
    if (mimeType.startsWith('image/')) {
      return 'uploads/images';
    } else if (mimeType === 'application/pdf') {
      return 'uploads/docs/pdf';
    } else if (
      mimeType === 'application/msword' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return 'uploads/docs/doc';
    } else {
      return 'uploads/others';
    }
  }

  private getResourceType(mimeType: string): 'image' | 'auto' | 'video' | 'raw' {
    if (mimeType.startsWith('image/')) {
      return 'image';
    }
    return 'auto';
  }
}