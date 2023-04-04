import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component } from '@angular/core';
import { User } from './classes/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ums';
  userSelected: User = new User();

  updateUser(utente: User){
    //console.log('app.comonent.updateUser.userSelected1:',  JSON.stringify(this.userSelected));    
    this.userSelected = utente;
    //console.log('app.comonent.updateUser.userSelected2:',  JSON.stringify(this.userSelected));    
    console.log('app.comonent.updateUser.utente:' , JSON.stringify(utente));

  }

  insertUser(){
    console.log("insertUser");
    this.userSelected = new User;
    this.userSelected.id = -1;
  }

  resetInsert(){
    this.userSelected.id = 0;
  }
}

