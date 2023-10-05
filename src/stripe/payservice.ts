import { Injectable } from '@nestjs/common';
import { stripeConfig } from 'src/payment/Config/stripe.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(stripeConfig.apiKey);
 
@Injectable()
export class PaymentServicestripe {
  
   
  
  async createPaymentLink(price:number,User:any) {




    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100*100, // Amount in cents
      currency: 'inr',
      payment_method_types: ['card'],
    });


   


    // Handle the payment success details
    if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded');
      console.log('Payment ID:', paymentIntent.id);
      console.log('Payment Amount:', paymentIntent.amount / 100, 'USD');
      // You can access more payment details in the paymentIntent object
    }


    return paymentIntent.client_secret;

  } catch (error) {
    console.error('Error:', error);
  }  




    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'inr',
    //         unit_amount: price * 100,
    //         product_data: {
    //           name: 'Checkout for Ecommerce app by Adam Tech'
    //         }
    //       },
    //       quantity: 1
    //     }
    //   ],
    //   metadata: {
    //     userId: User._id,
    //     UserEmail:User.email
    //   },
    //   mode: 'payment',
    //   success_url: 'http://localhost:3000/payment/success',
    //   cancel_url: 'https://yourwebsite.com/cancel', 
    // })
    
    // return session.url;

    
  // }

}