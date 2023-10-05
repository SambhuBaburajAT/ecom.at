import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    HomeModule,
    AdminModule,
    CartModule,
    PaymentModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
