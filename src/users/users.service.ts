import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashValue } from 'src/shared/helpers/helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  findUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async findUser(username: string) {
    const user = await this.findByUsername(username);
    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  async updateOne(user: User, updateUserDto: UpdateUserDto) {
    const newPassword =
      updateUserDto.password && (await hashValue(updateUserDto.password));

    await this.usersRepository.update(user.id, {
      ...updateUserDto,
      password: newPassword,
    });

    return await this.findUserById(user.id);
  }

  async findMany(query: string) {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const user = emailRegExp.test(query)
      ? await this.findUserByEmail(query)
      : await this.findByUsername(query);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async findWishes(id: number) {
    const { wishes } = await this.usersRepository.findOne({
      select: ['wishes'],
      where: { id },
      relations: ['wishes'],
    });
    return wishes;
  }

  async getUserWishes(username: string) {
    const { id } = await this.findByUsername(username);
    return await this.findWishes(id);
  }
}
