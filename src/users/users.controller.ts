import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { RemoveEmailInterceptor } from 'src/users/interseptors/remove-email.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: { user: User }) {
    return req.user;
  }

  @UseInterceptors(RemoveEmailInterceptor)
  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.usersService.findUser(username);
  }
}
