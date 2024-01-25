import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { IsUnique } from 'src/shared/validation/is-unique-constraint';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, length: 30 })
  @IsString()
  @Length(2, 30)
  @IsUnique('user', 'username', {
    message: 'Пользователь с именем $value уже существует.',
  })
  username: string;

  @Column({
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @IsString()
  @IsOptional()
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsUnique('user', 'email', {
    message: 'Пользователь с почтой $value уже существует.',
  })
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
}
