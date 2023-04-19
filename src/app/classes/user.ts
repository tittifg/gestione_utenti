import { UsersInterface } from '../interfaces/users';

export class User implements UsersInterface{
    id: number;
    name: string;
    lastname: string;
    email: string;
    fiscalcode: string;
    province: string;
    phone: string;
    age: number;  
    dataInserimento: Date;
    password: string;
   
    constructor(){
        this.id=0
        this.name=""
        this.lastname=""
        this.email=""
        this.fiscalcode=""
        this.province=""
        this.phone=""
        this.age=0
        this.dataInserimento=new Date();
        this.password = "";
        }
}
