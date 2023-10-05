import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserLogin, UserSighnupdto } from './UserDto/user.Dto';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
  constructor(private readonly Userservice: UserService) {}
  @Post('/signup')
  Signup(@Body() { email, password, username }: UserSighnupdto) {
    console.log(email, password, username);
    return this.Userservice.signUP({ email, password, username });
  }

  @Post('/signin')
  signIn(@Body() { email, password }: UserLogin ): Promise<any> {
    console.log(email, password);


    return this.Userservice.signInUser({ email, password });
  }



  // @Post('/login')
  // Login(@Body() { email, password }: UserLogin ){

  //   return this.Userservice.LoginUser

  // }
}
