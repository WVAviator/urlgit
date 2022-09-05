import { Redirect } from '../../redirects/entities/redirect.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destinationUrl: string;

  @Column()
  urlCode: string;

  @ManyToOne(() => User, (user) => user.urls)
  user: User;

  @OneToMany(() => Redirect, (redirect) => redirect.url, {
    eager: true,
  })
  redirects: Redirect[];

  @Expose()
  get shortUrl(): string {
    return `${process.env.BASE_URL}/${this.urlCode}`;
  }
}
