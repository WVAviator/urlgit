import {
  Catch,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception.message, 'Redirecting to home page.');
    response.redirect('/');
  }
}
