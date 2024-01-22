import { PickType } from '@nestjs/mapped-types';
import { Offer } from '../entities/offer.entity';
import { IsNumber } from 'class-validator';

export class CreateOfferDto extends PickType(Offer, ['hidden', 'amount']) {
  @IsNumber()
  itemId: number;
}
