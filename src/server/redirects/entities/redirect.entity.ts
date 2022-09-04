import { Url } from './../../urls/entities/url.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Redirect {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Url, (url) => url.redirects)
  url: Url;

  @Column()
  dateTime: Date;

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  referrer: string;
}
