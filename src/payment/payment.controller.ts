import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentServicestripe } from 'src/stripe/payservice';
import { UserAuthGuard } from 'src/user-auth/user-auth.guard';
@UseGuards(UserAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentStripe: PaymentServicestripe,
  ) {}

  @Get('') 
  paymentGatewat(@Request() res: any) {

console.log('hifewhfferf');
    return this.paymentService.Paymentgateway(res.user);
  }
  @Get('success')
  paymentSuccess(){
console.log('ITS SUUCCESFJASO;EGIRNEG');
    return 'success'
  }

}
 