import { IsNumber, IsString } from "class-validator";

export class productupdateadmin {
    @IsString()
    product:string
    @IsString()
    @IsNumber()
    price:number
    disc:string
    @IsString()

    id:string


}
