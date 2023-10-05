import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userType } from 'src/user/interface/User.interface';
import * as bcrypt from 'bcrypt';
@Injectable()

export class AuthService {
    constructor(
        @InjectModel('User') private readonly Usermodel: Model<userType>,

      ) {}

    // async LoginUser(email:string,password:string){
    //     const UserEmail = await this.Usermodel.findOne({ email: body.email });
    //     console.log(typeof body.password);
    //     if (!UserEmail) {
    //       return {
    //         statusCode: HttpStatus.BAD_REQUEST,
    //         message: 'email/password incorrect',
    //       };
    //     }
      
    //     const UserPassword = await bcrypt.compare(
    //       body.password,
    //       UserEmail.password,
    //     );
    //     console.log(UserPassword);
    //     if (!UserPassword) {
    //       return {
    //         statusCode: HttpStatus.BAD_REQUEST,
    //         message: 'email/password incorrect',
    //       };
    //     }
    //     else{
      
    //       const {username, password ,...rest}=UserEmail
    //       return  {rest}
    //     }
      
    //   }
    
}
