import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UrlsService } from '../urls/urls.service';
import { NotFoundExceptionFilter } from './notfound.filter';
import { RerouteInterceptor } from './reroute.interceptor';

@Controller()
export class RerouteController {
  @UseInterceptors(RerouteInterceptor)
  @UseFilters(NotFoundExceptionFilter)
  @Get(':urlcode')
  async reroute(
    @Req() req: Request,
    @Res() res: Response,
    @Param('urlcode') urlCode,
  ) {}
}
