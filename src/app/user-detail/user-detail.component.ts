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

  @Input() set utentex(utente: User){
    //Trasformato la semplice dichiarazione in un setter
    //faccio una copia per riferimento(_user) e una per valore (userCopy)
    //nel getter ritorno riferimento, ovvero _user
    //nella reset reimporto utente=usercopy che essendo passata per valore non viene modificata
    this._user = utente;
    this.userCopy = Object.assign({},utente);
  } //definisco variabile input. puo' essere tipo users o(|) undefined
  

  get utente(){
    return this._user;
  };

  constructor(private lUserService: userService, private route: ActivatedRoute, private router: Router ){
    //private route: ActivatedRoute attivo discesa parametri da url
    this.utentex = new User();
    this._user = new User();
    this.userCopy = new User();     
  }

  ngOnInit(){
    //Mi iscrivo al serviizo di route e leggo id
    this.route.params.subscribe(
      (params) => {
        if (params['id'] != null){
          const lUser = this.lUserService.getUser(Number(params['id']));
          if (lUser){
            this.utentex = lUser;
          }
          else{
            this.router.navigateByUrl('/users');
          }
        }
        console.log("user_detail:action:" + params['action'])
        if (params['action'] != null){
          this.lAction = params['action'];
          if (this.lAction == 'edit'){
            this.lTooltip = "Annulla modifiche";
          }
          else{
            this.lTooltip = "Torna all'elenco";
          }
          console.log("user_detail:tooltip:" + this.lTooltip)
        }          
      }
    );     
  }
  saveUser(){
    if (this._user.id == -1){
      console.log('this.utente=' , this._user.id , ': insert');
      console.log('this.utente= insert');
      this.lUserService.insertUser(this.utente!);
    }
    else{
      console.log('this.utente=' , this.utente.id , ': update');
      console.log('this.utente= update');
      this.lUserService.updateUser(this.utente!);
      this._user = Object.assign({},this.utente);
      this.userCopy = Object.assign({},this.utente);

    }
    //this.userUpdate.emit(this.utente);
  }

  undo(){
    this.router.navigateByUrl('/users');
  }

  resetForm(form: any) {
    console.log("this.utente!.id:" , this.utente.id)
    if (this.utente!.id===-1){
      this.utentex = new User;
    }
    else
    {
      //form.reset();
      this.utentex = this.userCopy;
    }

  }
}
