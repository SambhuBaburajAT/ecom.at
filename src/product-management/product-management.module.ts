import { Module } from '@nestjs/common';
import { ProductManagementController } from './product-management.controller';
import { ProductManagementService } from './product-management.service';

import { MongooseModule } from '@nestjs/mongoose';
import {  productSchema } from './Productschema/Product.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:"Products",schema:productSchema}])],
  controllers: [ProductManagementController],
  providers: [ProductManagementService],  
  exports:[ProductManagementService]
})
export class ProductManagementModule {}
