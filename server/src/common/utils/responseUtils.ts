import { HttpStatus } from '@nestjs/common';
import type { IApiResponse } from '../interfaces/apiInterface';

export class ResponseUtils {
  static success<T = any>(
    message: string,
    data: T
  ): IApiResponse<T> {
    return {
      success: true,
      message: message,
      body: data,
    };
  }

  static failed(
    message: string | object = '',
    body: object = {}
  ): IApiResponse {
    const bodyData = Object.keys(body).length > 0 ? body : {};
    return {
      success: false,
      message: message as string,
      body: bodyData,
    };
  }

  static error(
    err: any,
    error?: any
  ): { response: IApiResponse; statusCode: number } {
    let code: number = HttpStatus.FORBIDDEN;
    let message: string = '';

    if (err && typeof err === 'object') {
      code = (typeof (err as { code?: number }).code === 'number' && (err as { code?: number }).code !== undefined)
        ? (err as { code: number }).code
        : HttpStatus.FORBIDDEN;
      message = (typeof (err as { message?: string }).message === 'string' && (err as { message?: string }).message !== undefined)
        ? (err as { message: string }).message
        : '';
    } else if (typeof err === 'string') {
      message = err;
    }

    return {
      response: {
        success: false,
        message,
        body: { error: (error !== undefined && error !== null) ? (error as object) : { msg: 'no error' } },
      },
      statusCode: code,
    };
  }

  static badRequest(message: string, body: object = {}): IApiResponse {
    return this.failed(message, body);
  }

  static unauthorized(message: string = 'Unauthorized', body: object = {}): { response: IApiResponse; statusCode: number } {
    return {
      response: {
        success: false,
        message,
        body,
      },
      statusCode: HttpStatus.UNAUTHORIZED,
    };
  }

  static forbidden(message: string = 'Forbidden', body: object = {}): { response: IApiResponse; statusCode: number } {
    return {
      response: {
        success: false,
        message,
        body,
      },
      statusCode: HttpStatus.FORBIDDEN,
    };
  }

  static notFound(message: string = 'Not Found', body: object = {}): { response: IApiResponse; statusCode: number } {
    return {
      response: {
        success: false,
        message,
        body,
      },
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  static internalServerError(message: string = 'Internal Server Error', body: object = {}): { response: IApiResponse; statusCode: number } {
    return {
      response: {
        success: false,
        message,
        body,
      },
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}