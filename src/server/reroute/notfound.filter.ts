import { Catch, NotFoundException } from '@nestjs/common';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.log(exception.message, 'Redirecting to home page.');
    response.redirect('/');
  }
}
