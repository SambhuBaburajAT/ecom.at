import { Body, Controller, Delete, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/admin-gaurd/admin.guard';
import { ProductManagementService } from 'src/product-management/product-management.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer/MulterConfig';

@Controller('admin')
export class AdminController {
constructor(private readonly Adminservice:AdminService,private readonly  productmanagement:ProductManagementService){}

@Post('/login')
AdminLogin(@Body(){email,password}:{email:string,password:string}){

    
return this.Adminservice.adminLogin({email,password})
}

@UseGuards(AdminGuard)
@UseInterceptors(FileInterceptor('file', multerConfig))
@Post('/addproduct')
adminhome(@UploadedFile() file:any ,@Body(){product,price,disc}:{product:string,price:number,disc:string}){
console.log(product,price,disc);
console.log(file);
    
    return this.productmanagement.createProduct({product,price,disc,file})
}

@UseGuards(AdminGuard)
@Delete('deleteproduct')
DeleteProduct(@Body(){id}:{id:string}){

return this.productmanagement.deleteProduct(id)

}
@UseGuards(AdminGuard)
@Put('productupdate')
@UseInterceptors(FileInterceptor('file', multerConfig))
UpdateProduct(@UploadedFile() file:any ,@Body(){product,price,disc,id}:{product:string,price:number,disc:string,id:string}): Promise<any>{
    return this.productmanagement.updateproduct({product,price,dics:disc,id,images:file?.filename})
}

}
