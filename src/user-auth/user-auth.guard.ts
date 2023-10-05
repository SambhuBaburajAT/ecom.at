import { CanActivate, ExecutionContext, Headers, HttpCode, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { request } from 'http';

@Injectable()
export class UserAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): any | Promise<boolean> | Observable<boolean> {
try{

  const AuthHeader=context.switchToHttp().getRequest()



 
  const authorizationHeader = AuthHeader.headers['authorization'];
  console.log(authorizationHeader);
  const token = authorizationHeader.split(" ")[1];
   const auth:any= jwt.verify(token, process.env.jwtToken)


   if (auth.role=='user') {

    AuthHeader.user = auth;
 return true
  
  }
  else{
  return false
  }  

}
catch(err){

return false
}


  }
}

// if (AuthHeader) {
//   const token = AuthHeader.split(" ")[1];

//   jwt.verify(token, process.env.accessToken, (err, data) => {
 
//     if (err) {
//       console.log(err);
//       res.status(401).json({ message: "Unauthorized" });
//     } else {
      
//       req.LoggeDInUser = data;
//       next();
//     }
//   });
// } else {
//   res.status(401), json({ message: "Unauthorized" });
// }
// };