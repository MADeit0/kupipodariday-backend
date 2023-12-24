import { IsString, IsUrl, Length } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist extends BaseEntity {
  @Column({ length: 250 })
  @IsString()
  @Length(1, 250)
  name: string;

  @Column({ length: 1500 })
  @IsString()
  @Length(1, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishes)
  user: User;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}
