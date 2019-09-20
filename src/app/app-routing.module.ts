import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './views/postList/global/global.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['']);
const redirectLoggedInToTimeline = redirectLoggedInTo(['timeline']);

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    ...canActivate(redirectLoggedInToTimeline)
  },
  {
    path: 'timeline',
    component: GlobalComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'userinfo/:id',
    component: UserInfoComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  // TODO: Add a profile editor
  {
    path: 'profile',
    component: ProfileEditComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  }
  // TODO: Add a detailed thread viewer
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
