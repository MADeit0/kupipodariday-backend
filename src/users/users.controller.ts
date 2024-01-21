import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { RemoveEmailInterceptor } from 'src/users/interseptors/remove-email.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

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

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateUserProfile(
    @Request() req: { user: User },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(req.user, updateUserDto);
  }

  @Post('find')
  findByMany(@Body() findUserDto: FindUserDto) {
    return this.usersService.findMany(findUserDto.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  getOwnerWishes(@Request() req: { user: User }) {
    return this.usersService.findWishes(req.user.id);
  }

  @UseInterceptors(RemoveEmailInterceptor)
  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.usersService.findUser(username);
  }

  @UseInterceptors(RemoveEmailInterceptor)
  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }
}
