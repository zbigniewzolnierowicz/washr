import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './views/postList/global/global.component';
import { UserInfoComponent } from './views/user-info/user-info.component';


const routes: Routes = [
  {
    path: '',
    component: GlobalComponent
  },
  {
    path: 'userinfo/:id',
    component: UserInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
