import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/User.schema';

@Module({
  controllers: [],
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  providers: [AuthService,],
  exports:[]
})
export class AuthModule {}
 