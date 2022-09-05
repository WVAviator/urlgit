import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Url } from '../urls/entities/url.entity';
import { Redirect } from './entities/redirect.entity';

@Injectable()
export class RedirectsService {
  constructor(
    @InjectRepository(Redirect)
    private redirectRepository: Repository<Redirect>,
  ) {}

  create(url: Url, request: Request) {
    const redirect = this.redirectRepository.create({
      url,
      ipAddress: request.ip,
      referrer: request.get('Referrer'),
      dateTime: new Date(),
    });
    return this.redirectRepository.save(redirect);
  }

  findAll(urlId: number) {
    return this.redirectRepository.find({
      where: {
        url: {
          id: urlId,
        },
      },
    });
  }

  findOne(id: number) {
    return this.redirectRepository.findOne({ where: { id } });
  }
}
