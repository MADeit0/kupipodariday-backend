import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async create(id: number, createWishDto: CreateWishDto) {
    return await this.wishesRepository.save({
      ...createWishDto,
      owner: { id },
    });
  }

  async findOne(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: { owner: true, offers: true },
    });
    if (!wish) throw new NotFoundException('Подарок не найден');
    return wish;
  }

  async findTopWishes() {
    return await this.wishesRepository.find({
      take: 6,
      order: { copied: 'DESC' },
      relations: ['owner'],
    });
  }

  async findLastWishes() {
    return await this.wishesRepository.find({
      take: 6,
      order: { createdAt: 'DESC' },
      relations: ['owner'],
    });
  }
}
