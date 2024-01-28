import { IsEmail, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsEmail()
  email: string;
}
