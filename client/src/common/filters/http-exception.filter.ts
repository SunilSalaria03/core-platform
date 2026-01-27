// HTTP exception filter
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ApiResponseDto } from '../dto/api-response.dto';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      // context host
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      if (exception instanceof HttpException) {
        statusCode = exception.getStatus();
        const res = exception.getResponse();
  
        if (typeof res === 'string') {
          message = res;
        } else if (typeof res === 'object' && res !== null) {
          const msg = (res as { message?: unknown }).message;
          if (Array.isArray(msg)) {
            message = msg.join(', ');
          } else if (typeof msg === 'string') {
            message = msg;
          }
        }
      }
  
      // body response
      const body: ApiResponseDto<null> = {
        success: false,
        statusCode,
        message,
        data: null,
      };
  
      response.status(statusCode).json(body);
    }
  }
  