import { Module } from '@nestjs/common';
import { CommonUtilsService } from './common-utils.service';
import { FileUploadService } from './file-upload.service';
import { SearchService } from './search.service';

// Shared services and providers
@Module({
  providers: [CommonUtilsService, FileUploadService, SearchService],
  exports: [CommonUtilsService, FileUploadService, SearchService],
})
export class SharedModule {}
