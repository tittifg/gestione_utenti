import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { userService } from '../services/users.service';
import { UsersInterface } from '../interfaces/users';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tr[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class userComponent implements OnInit{
  @Input() utente: UsersInterface| undefined; //definisco variabile input. puo' essere tipo users o(|) undefined
  @Output('onDeleteUsers') userDeleted = new EventEmitter(); 
  @Output('onUpdateUsers') userUpdate = new EventEmitter(); 
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faMagn = faMagnifyingGlass;

  constructor(private service: userService, private router: Router){
    
  }

  ngOnInit(){}


  deleteUser(){
    console.log(this.utente);
    this.userDeleted.emit(this.utente); //raise evento
    //this.service.deleteUser(this.utente);
  }

  showUser(){
    console.log("show");
    this.router.navigateByUrl('/users/' + (this.utente?.id) + '/show');
    }
  updateUser(){
    //console.log('user_component:prima emit:' + JSON.stringify(this.utente));
    //this.userUpdate.emit(this.utente);
    console.log("route:" + this.utente?.id);
    this.router.navigateByUrl('/users/' + (this.utente?.id)  + '/edit');
  }

  
}
