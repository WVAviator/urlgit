import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlsService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}

  create(createUrlDto: CreateUrlDto, currentUser: User) {
    const urlCode = this.generateUrlCode();
    const url = this.urlRepository.create({
      ...createUrlDto,
      user: currentUser,
      urlCode,
    });
    return this.urlRepository.save(url);
  }

  private generateUrlCode() {
    const urlCode = Math.random().toString(36).substring(2, 8);
    return urlCode;
  }

  async findAll(userId: number) {
    const urls = await this.urlRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return urls;
  }

  async findOne(id: number, userId: number) {
    const url = await this.urlRepository.findOne({ where: { id } });
    if (!url) {
      throw new NotFoundException('Url not found');
    }
    if (url.user.id !== userId) {
      throw new UnauthorizedException('Url registered to another user');
    }
    return url;
  }

  async getUrlRedirect(urlCode: string) {
    console.log(`Checking the database for URL code: ${urlCode}`);
    const url = await this.urlRepository.findOne({ where: { urlCode } });
    if (!url) {
      throw new NotFoundException(
        `The requested URL at code ${urlCode} was not found.`,
      );
    }
    return url;
  }

  async remove(id: number, userId: number) {
    const url = await this.urlRepository.findOne({ where: { id } });
    if (!url) {
      throw new NotFoundException('Url not found');
    }
    if (url.user.id !== userId) {
      throw new UnauthorizedException('Url registered to another user');
    }
    return this.urlRepository.delete(url);
  }
}
