import { PickType } from '@nestjs/mapped-types';
import { Wishlist } from '../entities/wishlist.entity';
import { IsArray, IsNumber } from 'class-validator';

export class CreateWishlistDto extends PickType(Wishlist, [
  'name',
  'image',
  'description',
]) {
  @IsArray()
  @IsNumber({}, { each: true })
  itemsId: number[];
}
