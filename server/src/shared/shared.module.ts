import { Module } from '@nestjs/common';
import { CommonUtilsService } from './commonUtils.service';
import { FileUploadService } from './fileUpload.service';
import { SearchService } from './search.service';

// Shared services and providers
@Module({
  providers: [CommonUtilsService, FileUploadService, SearchService],
  exports: [CommonUtilsService, FileUploadService, SearchService],
})
export class SharedModule {}
