import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { NotFoundExceptionFilter } from './notfound.filter';
import { RerouteInterceptor } from './reroute.interceptor';

@Controller()
export class RerouteController {
  @UseInterceptors(RerouteInterceptor)
  @UseFilters(NotFoundExceptionFilter)
  @Get(':urlcode')
  async reroute() {}
}
