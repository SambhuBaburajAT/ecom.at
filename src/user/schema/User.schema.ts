import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop({ unique: [true, 'Duplicate mail entered'] })
  email: string;
  @Prop()
  password: string;
  @Prop()
  role:string
}
export const UserSchema = SchemaFactory.createForClass(User);
 