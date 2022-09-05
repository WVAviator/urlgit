import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { RerouteModule } from './reroute/reroute.module';
import { RedirectsModule } from './redirects/redirects.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'urlgit.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production' }),
      { viewsDir: null },
    ),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    UsersModule,
    UrlsModule,
    RerouteModule,
    RedirectsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
