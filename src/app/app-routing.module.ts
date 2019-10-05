import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';
import { CreditsComponent } from './views/credits/credits.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth', 'login']);
const redirectLoggedInToTimeline = redirectLoggedInTo(['posts']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
    ...canActivate(redirectLoggedInToTimeline)
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
  },
  {
    path: 'posts',
    loadChildren: () => import('./routes/posts/posts.module').then(m => m.PostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
