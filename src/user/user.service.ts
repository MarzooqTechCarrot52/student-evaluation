import { Injectable } from '@nestjs/common';
import RunTimeDatabase from '../libs/helper/runTimeDatabase'
import {randomUUID, UUID} from "crypto"
import { UserDTO } from './user.dto';
import type { User } from './user.interface';

@Injectable()
export class UserService {
    private DB = RunTimeDatabase.getInstance();

    createUser ( user: UserDTO){
        const id = randomUUID();
        const newUser = {
            ...user,
            id
        }
        this.DB.set(id,newUser)
        return newUser
    }

    getUser(){
        let data = this.DB.values();
        return data
    }

    getOne(id:string){
        return this.DB.get(id);
    }

    updateUser(id:string, body:User){
        let data = this.DB.values()

        const index = data.findIndex((item)=>item.id === id)
        if (index === -1) {
             throw new Error('Item not found');
        }
        const exisitingItem = data[index];
        const updatedItem = {
            ...exisitingItem,
            ...body,
            id: exisitingItem.id
        }
        this.DB.set(id,updatedItem)
        return updatedItem
    }

    deleteUser( id:string){
        const data = this.DB.get(id)
        
        this.DB.delete(id)
        return data
    }

}
