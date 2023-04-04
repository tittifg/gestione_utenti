import { Component } from '@angular/core';
import { faTrash,faHouse } from '@fortawesome/free-solid-svg-icons';
import {  EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  faTrash = faTrash;
  faHouse = faHouse;
  @Output('onInsertUser') eInsertUser = new EventEmitter();
  @Output('onResetInsert') eResetInsert = new EventEmitter();
  

  userInsert(){
    console.log("emit da nav insert user");
    this.eInsertUser.emit(); //raise evento
    
  }

  resetInsert(){
    console.log("emit da nav insert user");
    this.eResetInsert.emit(); //raise evento
    
  }
  
}
