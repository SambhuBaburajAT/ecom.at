import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): any | Promise<boolean> | Observable<boolean> {
    try {
      const AuthHeader = context.switchToHttp().getRequest();

      const authorizationHeader = AuthHeader.headers['authorization'];
      console.log(authorizationHeader);
      const token = authorizationHeader.split(' ')[1];
      const auth: any = jwt.verify(token, process.env.jwtToken);

      console.log(auth);
      if (auth.role == 'admin') {
        return true;
      } else {
        console.log('this is not admin');
        return false;
      }
    } catch (err) {
      console.log('this was failed');
      return false;
    }
  }
}
