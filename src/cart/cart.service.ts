import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, SchemaType, Types } from 'mongoose';
import { Cart } from './Schema/Cart.schema';

import { SchemaTypes } from 'mongoose';
import { request } from 'http';
import { User } from 'src/CustomDecorator/custom.dec';
import { types } from 'util';

interface carttype {
  User: string;
  products: string[];
}
@Injectable()
export class CartService {
  constructor(@InjectModel('cart') private readonly cartModel: Model<any>) {}

  async create(user: any, createCartDto: CreateCartDto) {
    const CartData = await this.cartModel.findOne({
      User: new mongoose.Types.ObjectId(user.id),
    });
    console.log(CartData);
    if (CartData) {
      const itemExist = CartData.products.filter((data) => {
        return (
          JSON.stringify(data.product_id) == JSON.stringify(createCartDto.id)
        );
      });

      const existingProductIndex = CartData.products.findIndex(
        (product: any) => product.product_id.toString() === createCartDto.id,
      );
      console.log(existingProductIndex);
      if (existingProductIndex === -1) {
        CartData.products.push({
          product_id: new Types.ObjectId(createCartDto.id),
          quantity: 1,
        });
        CartData.save();
      } else {
        CartData.products[existingProductIndex].quantity += 1;
        return CartData.save();
      }
    } else {
      console.log(CartData);
      await new this.cartModel({
        User: new Types.ObjectId(user.id),
        products: {
          product_id: new Types.ObjectId(createCartDto.id),
          quantity: 1,
        },
      }).save();
    }

    return {status:HttpStatus.ACCEPTED};
  }
 
  async decreaseItem(user: any, id: CreateCartDto) {
    console.log('im here');
    console.log(id, user.id);
    const CartData = await this.cartModel.findOne({
      User: new mongoose.Types.ObjectId(user.id),
    });
console.log(CartData);
    const findIndex = CartData.products.findIndex((data) => {
      console.log(data.product_id, id.id);
      return data.product_id.toString() == id.id;
    });
    console.log(findIndex);
    if (findIndex == -1) { 
      return { status: HttpStatus.BAD_GATEWAY };
    } else {
      console.log(CartData.products[findIndex]);
      if (CartData.products[findIndex].quantity != 1) {
        CartData.products[findIndex].quantity -= 1;
        CartData.save();
      } else {
        return { status: HttpStatus.BAD_REQUEST };
      }
    }

    return CartData;
  }

  async getProduct(user: any) {
    const Cart = await this.cartModel
      .findOne({ User: new mongoose.Types.ObjectId(user.id) })
      .populate('products.product_id');
    return Cart?Cart:{status:"no item"};

  }

  async DeleteItem(item: any, id: any) {
    console.log(id);
    const Cart = await this.cartModel.findOne({
      User: new mongoose.Types.ObjectId(item.id),
    });
    const findItem = Cart.products.findIndex((data) => {
      return data.product_id.toString() === id.id;
    });

    if (findItem != -1) {
      Cart.products.splice(findItem, 1);
      Cart.save();
      return { status: HttpStatus.ACCEPTED, message: 'product Removed' };
    } else {
      return { status: HttpStatus.BAD_REQUEST, message: 'product not Found' };
    }
  }





}
