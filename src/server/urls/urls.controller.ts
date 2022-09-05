import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/currentuser.decorator';
import { UrlTransformPipe } from './url-transform.pipe';
import { Throttle } from '@nestjs/throttler';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Throttle(2, 60)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new UrlTransformPipe()) createUrlDto: CreateUrlDto,
    @CurrentUser() currentUser,
  ) {
    return this.urlsService.create(createUrlDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() currentUser) {
    return this.urlsService.findAll(currentUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() currentUser) {
    return this.urlsService.findOne(+id, +currentUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() currentUser) {
    return this.urlsService.remove(+id, +currentUser.id);
  }
}
