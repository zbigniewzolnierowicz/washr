import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalComponent } from './views/global/global.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { PostViewComponent } from './views/post/post.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth', 'login']);
const redirectLoggedInToTimeline = redirectLoggedInTo(['posts']);

const routes: Routes = [
  {
    path: '',
    component: GlobalComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'post/:id',
    component: PostViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
