import { Url } from './../../urls/entities/url.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Redirect {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Url, (url) => url.redirects, { onDelete: 'CASCADE' })
  url: Url;

  @Transform(({ value }) => value.toISOString())
  @Column()
  dateTime: Date;

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  referrer: string;
}
