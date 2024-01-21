import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsUniqueConstraint } from './shared/validation/is-unique-constraint';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
        entities: ['dist/**/*.entity.js'],
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService,
    IsUniqueConstraint,
  ],
})
export class AppModule {}
