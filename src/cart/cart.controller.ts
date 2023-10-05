import { Controller, Get, Post, Body, Patch, Param, Delete, Req ,Request, UseGuards, Put} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartModule } from './cart.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthGuard } from 'src/user-auth/user-auth.guard';


@UseGuards(UserAuthGuard)
@Controller('cart')
export class CartController {
  
  constructor(private readonly cartService: CartService,
    @InjectModel('cart') private cartModel: Model<any>
    ) {}
  @Post('/addtocart')
  create(@Request() req,@Body() createCartDto: CreateCartDto) {
   console.log(req.user);

    return this.cartService.create(req.user,createCartDto);
  }
  
  @Put('/decreaseitem')
  decreaseItem(@Request() req:any,@Body()id:CreateCartDto){

    return this.cartService.decreaseItem(req.user,id)

  }
@Get()
getCart(@Request() req:any){
  console.log(req.user);
return this.cartService.getProduct(req.user)

}
@Delete('cartremoveitem')
DeleteItem(@Request() req:any,@Body()id:string){
return this.cartService.DeleteItem(req.user,id)
}



}
