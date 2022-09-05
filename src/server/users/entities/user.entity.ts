import { Url } from '../../urls/entities/url.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];
}
