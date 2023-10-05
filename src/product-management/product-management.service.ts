import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as fs from 'fs';


interface productItems{
    product:string;
    price:number;
    disc:string;
    file:any
}
interface productupload{
    product:string;
    price:number;
    disc:string;
    images:string
}
@Injectable()
export class ProductManagementService {   
constructor( @InjectModel('Products') private readonly productModule: Model<productupload>){}
async createProduct(body:productItems){


new this.productModule({

    product:body.product,
    price:body.price,
    dics:body.disc,
    images:body.file.filename
}).save()

return {
    statusCode: HttpStatus.CREATED,
    message: 'Product Added',
  };
}

async deleteProduct(id:string)
{

const product=await this.productModule.findById(new mongoose.Types.ObjectId(id))


fs.unlink(`./uploads/${product.images}`, (err) => {
    if (err) {
      console.error("Error deleting old image:", err);
    } else {
      console.log("Old image deleted successfully");
    }
  });

 



await this.productModule.findByIdAndDelete(new mongoose.Types.ObjectId(id))



return {
    status:HttpStatus.ACCEPTED,
    message:'Product Deleted Successfully'
}

}

async updateproduct(body:any){
  const updateObject = Object.fromEntries(
    Object.entries(body).filter(([key, value]) =>  value !== '')
);

 await this.productModule.findByIdAndUpdate(new mongoose.Types.ObjectId(body.id),updateObject)

  return{status:HttpStatus.ACCEPTED,
  message:"products updated"}
}

}