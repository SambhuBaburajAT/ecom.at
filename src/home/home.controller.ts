import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/user-auth/user-auth.guard';


@Controller('home')
export class HomeController {
    @UseGuards(UserAuthGuard)
@Get('')
homepage(@Request() request){

    console.log(request.user);
    return {page:request.user}
}


}
