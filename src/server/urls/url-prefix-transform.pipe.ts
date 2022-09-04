import { PipeTransform } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';

export class UrlPrefixTransformPipe implements PipeTransform {
  transform({ destinationUrl }: CreateUrlDto) {
    if (!destinationUrl.startsWith('https://')) {
      destinationUrl = 'https://' + destinationUrl;
    }
    return { destinationUrl };
  }
}
