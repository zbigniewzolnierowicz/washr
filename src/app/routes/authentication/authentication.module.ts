import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule]
})
export class AuthenticationModule {}
