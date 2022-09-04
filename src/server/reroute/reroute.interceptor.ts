import { Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { RedirectsService } from '../redirects/redirects.service';
import { UrlsService } from '../urls/urls.service';

@Injectable()
export class RerouteInterceptor implements NestInterceptor {
  constructor(
    private redirectsService: RedirectsService,
    private urlsService: UrlsService,
  ) {}

  async intercept(context: any, next: any) {
    const req = context.switchToHttp().getRequest();
    const urlCode = req.params.urlcode;
    if (urlCode.startsWith('__nextjs')) {
      return next.handle();
    }

    const rerouteUrl = await this.urlsService.getUrlRedirect(urlCode);

    await this.redirectsService.create(rerouteUrl, req);

    const res = context.switchToHttp().getResponse();
    res.redirect(rerouteUrl.destinationUrl);

    return next.handle();
  }
}
