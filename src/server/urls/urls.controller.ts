import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/currentuser.decorator';
import { UrlPrefixTransformPipe } from './url-prefix-transform.pipe';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new UrlPrefixTransformPipe()) createUrlDto: CreateUrlDto,
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
