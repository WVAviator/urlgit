import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { Redirect } from './entities/redirect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Redirect])],
  exports: [RedirectsService],
  providers: [RedirectsService],
})
export class RedirectsModule {}
