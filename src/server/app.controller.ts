import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { CurrentUser } from './auth/decorators/currentuser.decorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UnauthorizedExceptionFilter } from './auth/filters/unauthorized.filter';
import { UrlsService } from './urls/urls.service';

@Controller()
export class AppController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  @Render('index')
  public index(@CurrentUser() currentUser) {
    return { ...currentUser };
  }

  @Get('signin')
  @Render('signin')
  public signin(@CurrentUser() currentUser) {
    return { ...currentUser };
  }

  @Get('signup')
  @Render('signup')
  public signup() {}

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Render('dashboard')
  public async dashboard(@CurrentUser() currentUser) {
    const urls = await this.urlsService.findAll(currentUser.id);
    return { currentUser: { ...currentUser }, urls: [...urls] };
  }
}
