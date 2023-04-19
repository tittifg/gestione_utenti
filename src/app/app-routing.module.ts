import { usersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { userService } from './services/users.service';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'users',
    pathMatch: "full",
    component: usersComponent
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'users'
  },
  {
    path: 'users/new/:action',    
    component: UserDetailComponent
  },
  {
    path: 'users/:id/:action',    
    component: UserDetailComponent
  } ,
  {
    path: 'users/:id',    
    component: UserDetailComponent,
    
  }     
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    FontAwesomeModule],
  exports: [RouterModule,
    FormsModule,
    FontAwesomeModule]
})
export class AppRoutingModule { }
