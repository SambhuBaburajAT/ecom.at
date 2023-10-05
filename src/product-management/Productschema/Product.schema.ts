import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  product: string;

  @Prop()
  price: string;
  @Prop()
  dics: string;
  @Prop()
  images:string
}
export const productSchema = SchemaFactory.createForClass(Product);
 