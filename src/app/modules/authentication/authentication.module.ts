import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent],
  imports: [CommonModule, AuthenticationRoutingModule]
})
export class AuthenticationModule {}
