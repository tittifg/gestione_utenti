import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { UsersResponse, userService } from '../services/users.service';
import { UsersInterface } from '../interfaces/users';
import { ActivatedRoute, Router } from '@angular/router';
import { userComponent } from '../user/user.component';
import { BehaviorSubject, Observable } from "rxjs";

@Component({
    selector: 'app-users',
    templateUrl:'users.component.html',
    styleUrls:['users.component.css']
})

//


export class usersComponent implements OnInit, AfterViewInit{
    public title = 'Utenti';
    //public users: UsersInterface[] = [];
    event$ = new BehaviorSubject(true);
    public users$: Observable<UsersResponse> = this.service.getUsers();

    @Output('onUpdateUsers') userUpdate = new EventEmitter<UsersInterface>(); 
    
    //viewchildren permette di accedere agli elementi del dom
    //del componente userComponets. dichiaro variabile trs di tipo usercomponent
    @ViewChildren(userComponent,{read: ElementRef} ) trs!:QueryList<ElementRef>; //elementRef è un riferimento ad un oggetto del dom

    
    constructor (private service: userService ){
        
    }
    ngAfterViewInit(): void {
      console.log("afterViewInit:users$" + JSON.stringify(this.users$));
      this.trs.forEach(ele=>console.log("afterViewInit"+ele));
      console.log("afterViewInit2:" + this.trs.toString());
      
    }
    
    ngOnInit(){
        //this.users = this.service.getUsers();    
        //Si iscrive sopra 
        /*
        //Fa subscrive a ritorno servizio e assegna la risposta a this.users
        this.service.getUsers()
                    .subscribe(Response=>this.users= Response.users);
        
        console.log('USERS:' + JSON.stringify(this.users));
        */
    }    
    deleteUser(utente: UsersInterface){
      console.dir(this.trs); 
      console.log('users_component:deleteUsers:prima emit:' + JSON.stringify(utente));
      this.service.deleteUser(utente).subscribe(Response=>{ console.log(Response);
                                                            this.trs.forEach(ele=> {
                                                              if (ele.nativeElement.id == utente.id)
                                                              {
                                                                ele.nativeElement.parentNode.removeChild(ele.nativeElement)
                                                              }    
                                                              //fa un ciclo su tutti i nativeeelement e se match id, rimuove se stesso
                                                            })
                                                              //location.reload();//ricarica il componente
                                                           });
      }
      
    updateUser(utente: UsersInterface){
        //console.log('users_component:updateUsers:prima emit:' + JSON.stringify(utente));
        const userCopy = Object.assign({},utente)
        this.userUpdate.emit(userCopy);
      }      
    }