import { Component, Input } from '@angular/core';
import { UsersInterface } from '../interfaces/users';
import { userService } from '../services/users.service';
import { User } from '../classes/user';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faRotateBack} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  private userCopy!: User;
  private _user!: User;
  lAction= '';
  faRotateBack = faRotateBack;
  faCircleCheck = faCircleCheck;
  faTrash = faTrash;
  lTooltip = '';
  lNotFind = false;
  myjson:any=JSON;

  @Input() set utente(utente: User){
    //Trasformato la semplice dichiarazione in un setter
    //faccio una copia per riferimento(_user) e una per valore (userCopy)
    //nel getter ritorno riferimento, ovvero _user
    //nella reset reimporto utente=usercopy che essendo passata per valore non viene modificata
    console.log('user-detail.set_utenteX:utente:' + JSON.stringify(utente));
    this._user = utente;
    this.userCopy = Object.assign({},utente);
  } //definisco variabile input. puo' essere tipo users o(|) undefined
  

  get utente(){
    return this._user;
    console.log('user-detail.set_utenteX:utente:' + JSON.stringify(this._user));
  };

  constructor(private lUserService: userService, private route: ActivatedRoute, private router: Router ){
    //private route: ActivatedRoute attivo discesa parametri da url
    this.utente = new User();
    this._user = new User();
    this.userCopy = new User();     
  }

  ngOnInit(){
    //Mi iscrivo al serviizo di route e leggo id
    this.route.params.subscribe(
      (params) => {
        console.log('user-detail.ngOnInit:params[id]:' +params['id']);
        if (params['id'] != null){
          console.log('user-detail.ngOnInit:id:' + params['id']);
          //const lUser = this.lUserService.getUser(Number(params['id']));
          let lUser = new User;
          this.lUserService.getUser (Number(params['id']))
          .subscribe( user=>{
            this.utente= user.data;
            if (this.utente){
              console.log('user-detail.ngOnInit:users trovato:lUser:' +JSON.stringify(this.utente));
              
              this.lNotFind = false;
            }
            else{
              console.log('user-detail.ngOnInit:users non trovato, redirect su users');            
              this.lNotFind = true;
              //this.router.navigateByUrl('/users');
            }
  
          });
          
        }
        console.log("user_detail:action:" + params['action'])
        if (params['action'] != null){
          this.lAction = params['action'];
          if (this.lAction == 'edit' ){
            this.lTooltip = "Annulla modifiche";
          }
          else if (this.lAction == 'insertUser'){
            this._user = new User();
            this._user.id = -1;
          } 
          else {
            this.lTooltip = "Torna all'elenco";
          }
          console.log("user_detail:tooltip:" + this.lTooltip)
        }          
      }
    );     
  }
  saveUser(){
    let obs;

    if (this._user.id == -1){
      console.log('this.utente=' , this._user.id , ': insert');
      console.log('this.utente= insert');
      console.log('utente da inserire:', JSON.stringify(this._user));
      obs = this.lUserService.insertUser(this._user);
    }
    else{
      console.log('this.utente=' , this.utente.id , ': update');
      console.log('this.utente= update');
      console.log('utente da aggiornare:', JSON.stringify(this.utente));
      obs = this.lUserService.updateUser(this.utente);
      this._user = Object.assign({},this.utente);
      this.userCopy = Object.assign({},this.utente);
    }
    obs.subscribe(resp=>{
      console.log('Response:' + JSON.stringify(resp));
      this.router.navigateByUrl('/users');
    });
    
    //this.router.navigateByUrl('/users');;
  }

  undo(){
    this.router.navigateByUrl('/users');
  }

  resetForm(form: any) {
    console.log("this.utente!.id:" , this.utente.id)
    if (this.utente!.id===-1){
      this.utente = new User;
    }
    else
    {
      //form.reset();
      this.utente = this.userCopy;
    }

  }
}
