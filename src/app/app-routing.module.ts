import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './views/postList/global/global.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const redirectLoggedInToTimeline = redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: GlobalComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    component: LoginPageComponent,
    ...canActivate(redirectLoggedInToTimeline)
  },
  {
    path: 'userinfo/:id',
    component: UserInfoComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
