import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { userType } from './interface/User.interface';
interface bodytype {
  username: string;
  password: string;
  email: string;
}
interface SigninType {
  password: string;
  email: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly Usermodel: Model<userType>,
    private jwtService: JwtService,
  ) {}

  async signUP(body: bodytype) {
    const UserExist = await this.Usermodel.findOne({ email: body.email });
    if (UserExist) {
      return { message: 'User Already Exist' };
    }
    const password = body.password;
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    new this.Usermodel({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      role:'user'
    }).save();
    return { message: 'Account Created' };
  }

  async signInUser(body: SigninType) {
    const UserEmail:any = await this.Usermodel.findOne({ email: body.email });
    console.log(UserEmail);
    if (!UserEmail) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'email/password incorrect',
      };
    }

    const UserPassword = await bcrypt.compare(
      body.password,
      UserEmail.password,
    );
    console.log(UserPassword);
    if (!UserPassword) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'email/password incorrect',
      };
    }
console.log(UserEmail);
const JWTtokenvalue={email:UserEmail.email,id:UserEmail._id,role:UserEmail.role}
    return { token: this.jwtService.sign(JWTtokenvalue) }; 
  }


async LoginUser(body: SigninType){
  const UserEmail = await this.Usermodel.findOne({ email: body.email });
  console.log(typeof body.password);
  if (!UserEmail) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'email/password incorrect',
    };
  }

  const UserPassword = await bcrypt.compare(
    body.password,
    UserEmail.password,
  );
  console.log(UserPassword);
  if (!UserPassword) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'email/password incorrect',
    };
  }
  else{

    const {username, password ,...rest}=UserEmail
    return  {rest}
  }

}



}
