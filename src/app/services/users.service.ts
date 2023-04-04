
import { Injectable} from "@angular/core";
import { UsersInterface } from '../interfaces/users';
import { User } from '../classes/user';

@Injectable() 
export class userService{

    users: UsersInterface[] = [
    {
        id: 1,
        name: 'Hidran1',
        lastname: 'Arias',
        email: 'hidran@gmail.com',
        fiscalcode: 'RSAHRN72M22Z444S',
        province: 'Torino',
        phone: '454545455',
        age: 43,
        dataInserimento: new Date('01-01-1900')
    },
    {
        id: 2,
        name: 'Hidran2',
        lastname: 'Arias',
        email: 'hidran@gmail.com',
        fiscalcode: 'RSAHRN72M22Z444S',
        province: 'Torino',
        phone: '454545455',
        age: 43,
        dataInserimento:  new Date('01-01-1900')
    },
    {
        id: 3,
        name: 'Hidran3',
        lastname: 'Arias',
        email: 'hidran@gmail.com',
        fiscalcode: 'RSAHRN72M22Z444S',
        province: 'Torino',
        phone: '454545455',
        age: 43,
        dataInserimento: new Date('01-01-1900')
    },
    {
        id: 4,
        name: 'Hidran4',
        lastname: 'Arias',
        email: 'hidran@gmail.com',
        fiscalcode: 'RSAHRN72M22Z444S',
        province: 'Torino',
        phone: '454545455',
        age: 43,
        dataInserimento: new Date('01-01-1900')
    }

    ];


    deleteUser(user: UsersInterface){
        console.log(user);
        const index = this.users.indexOf(user);
        console.log("index:" + index);
        if (index > -1 ){            
            this.users.splice(index,1);
            console.log("splice:" + this.users);
        }
        return this.users;
    } 

    getUsers(){
        return this.users;        
    }

    getUser(id: number): User | undefined {

        //return this.users[id];
        return this.users.find(user => user.id===id)
      }

    updateUser(user:UsersInterface){
        const idx = this.users.findIndex((v)=>v.id==user.id)
        console.log("updateUser:user:" + user.name);
        if (idx!=-1){
            this.users[idx] = user;
        }
    }

    insertUser(user:UsersInterface){
        user.id = this.users.length;
        console.log('insertUser:' || JSON.stringify(user));
        console.log('insertUser:name:' || user.name);
        this.users.splice(0,0,user);
        
    }

}