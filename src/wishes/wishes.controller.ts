import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { RemoveEmailInterceptor } from 'src/users/interseptors/remove-email.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Request() req: { user: User }, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user.id, createWishDto);
  }

  @Get('top')
  getTopWishes() {
    return this.wishesService.findTopWishes();
  }

  @Get('last')
  getLastWishes() {
    return this.wishesService.findLastWishes();
  }

  @UseInterceptors(RemoveEmailInterceptor)
  @Get(':id')
  getWishesById(@Param('id', ParseIntPipe) id: number) {
    return this.wishesService.findOne(id);
  }
}
