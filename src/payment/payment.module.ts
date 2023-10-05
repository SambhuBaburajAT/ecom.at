import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentServicestripe } from 'src/stripe/payservice';
import { CartSchema } from 'src/cart/Schema/Cart.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cart', schema: CartSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentServicestripe],
})
export class PaymentModule {}
