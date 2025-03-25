import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string;

    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      message = Array.isArray(exceptionResponse['message'])
        ? exceptionResponse['message'][0]
        : exceptionResponse['message'];
    } else {
      message = exception.message;
    }

    response.status(status).json({
      code: status,
      data: null,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
