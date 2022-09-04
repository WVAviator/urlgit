import { Url } from '../../urls/entities/url.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];
}
