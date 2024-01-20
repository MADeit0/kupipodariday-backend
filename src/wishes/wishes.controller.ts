import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Patch,
  Delete,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { RemoveEmailInterceptor } from 'src/users/interseptors/remove-email.interceptor';
import { UpdateWishDto } from './dto/update-wish.dto';

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
  getWishesById(@Param('id') id: number) {
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateWish(
    @Request() req: { user: User },
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.updateWish(id, updateWishDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeWish(@Request() req: { user: User }, @Param('id') id: number) {
    return this.wishesService.removeOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  copyWish(@Param('id') id: number, @Request() req: { user: User }) {
    return this.wishesService.copy(id, req.user.id);
  }
}
