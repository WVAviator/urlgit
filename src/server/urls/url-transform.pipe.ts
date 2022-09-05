import { PipeTransform } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';

export class UrlTransformPipe implements PipeTransform {
  transform({ destinationUrl }: CreateUrlDto) {
    if (!destinationUrl.startsWith('http')) {
      destinationUrl = 'https://' + destinationUrl;
    }
    return { destinationUrl };
  }
}
