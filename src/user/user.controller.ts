import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UtilService } from 'src/libs/utils/util.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor 
    ( private readonly userservice : UserService ,
      private readonly util : UtilService,              
    ) {}


@Post()
createUser(@Body(new ValidationPipe()) body: UserDTO){
    const userData = this.userservice.createUser(body);
    return this.util.createResponse({
          status: userData ? 'SUCCESS' : 'BAD_REQUEST',
          cat: 'USER',
          data: userData,
    })
} 

@Get()
GetUser(){
    const userData = this.userservice.getUser()
    return this.util.createResponse({
          status: userData ? 'SUCCESS' : 'BAD_REQUEST',
          cat: 'USER',
          data: userData,
    })
}

@Get(':id')
GetOneUser(@Param('id') id:string) {
    const userData = this.userservice.getOne(id)
    return this.util.createResponse({
          status: userData ? 'SUCCESS' : 'BAD_REQUEST',
          cat: 'USER',
          data: userData,
    })
}

@Put(':id')
updateInventory(@Param('id') id: string , @Body() body:UserDTO){
    const userData = this.userservice.updateUser(id,body)
    return this.util.createResponse({
          status: userData ? 'SUCCESS' : 'BAD_REQUEST',
          cat: 'USER',
          data: userData,
    })
}

@Delete(':id')
deleteInventory(@Param('id') id:string){
    const userData= this.userservice.deleteUser(id)
    return this.util.createResponse({
          status: userData ? 'SUCCESS' : 'BAD_REQUEST',
          cat: 'USER',
          data: userData,
    })
}
}
