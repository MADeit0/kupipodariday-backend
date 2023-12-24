import { IsBoolean, IsNumber } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Offer extends BaseEntity {
  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @Column('bool', { default: false })
  @IsBoolean()
  hidden: boolean;
}
