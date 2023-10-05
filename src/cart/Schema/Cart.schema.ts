import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/product-management/Productschema/Product.schema';
import { SchemaTypes, Types } from 'mongoose';
import { User, UserSchema } from 'src/user/schema/User.schema';
@Schema({
  timestamps: true,
})
export class Cart {
  @Prop(
    {
      User: { type: SchemaTypes.ObjectId, ref: "User"},
    },
  )
  User: Types.ObjectId
  @Prop([
    {
      quantity: { type: Number, required: true },
      product_id: { type: SchemaTypes.ObjectId, ref: "Products" }, // Assuming 'Product' is the name of your product schema
    },
  ])
  
  products: Array<{
    quantity: number;
    product_id: Types.ObjectId;
  }>;
  
}
export const CartSchema = SchemaFactory.createForClass(Cart);
