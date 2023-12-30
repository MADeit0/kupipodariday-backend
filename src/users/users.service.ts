import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findUserByField(
    value: string | number,
    field: 'id' | 'username' | 'email',
  ) {
    const user = await this.userRepository.findOneBy({ [field]: value });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }
}
