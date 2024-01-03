import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Offer } from './offers/entities/offer.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: +configService.get('PR_PORT'),
        username: configService.get('PR_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DB'),
        synchronize: configService.get('SYNCHRONIZE'),
        entities: [User, Offer, Wish, Wishlist],
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
