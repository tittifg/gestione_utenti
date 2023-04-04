import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { userService } from '../services/users.service';
import { UsersInterface } from '../interfaces/users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl:'users.component.html',
    styleUrls:['users.component.css']
})

export class usersComponent implements OnInit{
    public title = 'Utenti';
    public users: UsersInterface[] = [];
    @Output('onUpdateUsers') userUpdate = new EventEmitter<UsersInterface>(); 
    
    constructor (private service: userService ){
        
    }
    
    ngOnInit(){
        this.users = this.service.getUsers();        
    }    
    deleteUser(utente: UsersInterface){
      //console.log('users_component:deleteUsers:prima emit:' + JSON.stringify(utente));
        this.service.deleteUser(utente);
      }
      
    updateUser(utente: UsersInterface){
        //console.log('users_component:updateUsers:prima emit:' + JSON.stringify(utente));
        const userCopy = Object.assign({},utente)
        this.userUpdate.emit(userCopy);
      }      
    }