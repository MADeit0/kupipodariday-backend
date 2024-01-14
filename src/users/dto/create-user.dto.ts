import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { IsUnique } from 'src/shared/validation/is-unique-constraint';

export class CreateUserDto {
  @IsString()
  @IsUnique('user', 'username', {
    message: 'Пользователь с именем $value уже существует.',
  })
  @Length(2, 30)
  username: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsEmail()
  @IsUnique('user', 'email', {
    message: 'Пользователь с почтой $value уже существует.',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  password: string;
}
