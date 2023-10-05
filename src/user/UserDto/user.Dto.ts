import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSighnupdto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsString()
  username: string;
}
export class UserLogin {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;

  }