import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './views/postList/global/global.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';
import { CreditsComponent } from './views/credits/credits.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth', 'login']);
const redirectLoggedInToTimeline = redirectLoggedInTo(['timeline']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
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
  {
    path: 'profile',
    component: ProfileEditComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'about',
    component: CreditsComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./routes/authentication/authentication.module').then(m => m.AuthenticationModule)
  }
  // TODO: Add a detailed thread viewer
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
