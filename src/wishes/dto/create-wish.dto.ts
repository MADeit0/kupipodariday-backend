import { Expose } from 'class-transformer';
import { Wish } from '../entities/wish.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateWishDto extends PickType(Wish, [
  'name',
  'link',
  'image',
  'price',
  'description',
] as const) {
  @Expose()
  name: string;
  @Expose()
  link: string;
  @Expose()
  image: string;
  @Expose()
  price: number;
  @Expose()
  description: string;
}
