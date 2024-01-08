import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });

    return user;
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findUserByField(
    value: string | number,
    field: 'id' | 'username' | 'email',
  ) {
    const user = await this.usersRepository.findOneBy({ [field]: value });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }
}
