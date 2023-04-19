import { environment } from './../../environments/environment.development';

import { Injectable} from "@angular/core";
import { UsersInterface } from '../interfaces/users';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UsersResponse {
    data: User[];
    message: string;
  }

  export interface UserResponse {
    data: User;
    message: string;
  }

  
@Injectable() 
export class userService{
    apiurl = environment.APIURL;
    constructor(private http: HttpClient){
        

    }

    deleteUser(user: UsersInterface){
        console.log(user);
        //const index = this.users.indexOf(user);
        //console.log("index:" + index);
        //if (index > -1 ){            
        //    this.users.splice(index,1);
        //    console.log("splice:" + this.users);
        //}
        //return this.users;
        console.log('delete:' + this.apiurl+ '/' + user.id);
        return this.http.delete<UserResponse>(this.apiurl+ '/' + user.id)  ;
    } 

    getUsers(): Observable<UsersResponse>{
        //La sintassi <User[]> significa che ritorna un array di user. Observable che è uno stream di dati
        console.log('getUsers:' + this.apiurl);
        return this.http.get<UsersResponse>(this.apiurl)   ;    
    }

    getUser(id: number): Observable<UserResponse> {

        //return this.users[id];
        //return this.users.find(user => user.id===id)
        console.log('getUser:' + this.apiurl+ '/' + id);
        return this.http.get<UserResponse>(this.apiurl+ '/' + id)   ;
      }

    updateUser(user:UsersInterface): Observable<UserResponse> {
        //const idx = this.users.findIndex((v)=>v.id==user.id)
        console.log("updateUser:user:" + user.name);
        console.log("updateUser:user:" + user.id);
        console.log("updateUser:user:" + JSON.stringify(user));
        //if (idx!=-1){
        //    this.users[idx] = user;
        //}
        return this.http.patch<UserResponse>(this.apiurl+ '/' + user.id,user)  ;
    }

    insertUser(user:UsersInterface): Observable<UserResponse> {
        //user.id = this.users.length;
        user.id=0
        console.log('insertUser:' + JSON.stringify(user));
        console.log('insertUser:name:' + user.id);
        //this.users.splice(0,0,user);
        
        return this.http.post<UserResponse>(this.apiurl ,user)  ;
    }

}