import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';

import { ProductManagementService } from 'src/product-management/product-management.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer/MulterConfig';
import { productSchema } from 'src/product-management/Productschema/Product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/cart/Schema/Cart.schema';


console.log(process.env.jwtToken);

@Module({
  imports:[MongooseModule.forFeature([{name:"Products",schema:productSchema}]),  MulterModule.register(multerConfig),JwtModule.register({
    secret:'secret',
    signOptions:{expiresIn:'20d'}
  })],
  controllers: [AdminController],
  providers: [ProductManagementService,AdminService]
})
export class AdminModule {}
 