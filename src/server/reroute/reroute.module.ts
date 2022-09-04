import { Module } from '@nestjs/common';
import { RedirectsModule } from '../redirects/redirects.module';
import { UrlsModule } from '../urls/urls.module';
import { RerouteController } from './reroute.controller';

@Module({
  controllers: [RerouteController],
  imports: [UrlsModule, RedirectsModule],
})
export class RerouteModule {}
