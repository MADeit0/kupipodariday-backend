import { IsInt, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Wish extends BaseEntity {
  @Column({ length: 250 })
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  raised: number;

  @Column({ length: 1024 })
  @IsString()
  @Length(1, 1024)
  description: string;

  @Column('int', { default: 0 })
  @IsInt()
  copied: number;
}
