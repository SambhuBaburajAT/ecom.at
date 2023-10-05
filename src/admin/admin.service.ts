import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface signinadmin{
    email:string;
    password:string
}
@Injectable()

export class AdminService {
constructor(private readonly jwtService: JwtService){}
adminLogin(body:signinadmin){
    console.log('here');
const Adminemial:any=process.env.AdminEmial
const Adminpass:string=process.env.adminpassword
console.log(Adminpass);
console.log(Adminpass);
console.log(process.env.jwtToken);
if(body.email===Adminemial&&body.password==Adminpass){
const Admin:any={
    Adminemial,role:"admin"
}

    return { token: this.jwtService.sign(Admin) }; 
    


} 
else{ return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'email/password incorrect',
      };
}
}

}
