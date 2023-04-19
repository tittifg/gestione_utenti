import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { usersComponent } from './users/users.component';
import { userService } from './services/users.service';
import { userComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { User } from './classes/user';
import { PhonePipe } from './pipes/phone.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    usersComponent,
    userComponent,
    UserDetailComponent,
    PhonePipe,
    NavComponent//,
    //HttpClientModule
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [userService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
