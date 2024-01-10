import { Injectable } from '@nestjs/common';
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
    return this.usersRepository.findOneBy({ username });
  }

  findUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
