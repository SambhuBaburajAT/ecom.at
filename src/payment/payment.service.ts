import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PaymentServicestripe } from 'src/stripe/payservice';

@Injectable()
export class PaymentService {
  constructor(
    private readonly payment: PaymentServicestripe,
    @InjectModel('cart') private readonly cartModel: Model<any>,
    @InjectModel('User') private readonly Usermodel: Model<any>,
  ) {}
  async Paymentgateway(User: any) {
    const Cart = await this.cartModel
      .findOne({ User: new mongoose.Types.ObjectId(User.id) })
      .populate('products.product_id')
      .populate('User')
      .exec();

    const carttotal = Cart.products.reduce((total, data) => {
      return (total = total + data.product_id.price * data.quantity);
    }, 0);
    const UserData = await this.Usermodel.findById(
      new mongoose.Types.ObjectId(User.id),
    );
    console.log(UserData);
    console.log(Cart);

    return this.payment.createPaymentLink(carttotal, UserData);
  }
}
