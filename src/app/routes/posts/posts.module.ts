import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { GlobalComponent } from './views/global/global.component';
import { PostComponent } from './components/post/post.component';
import { UploadComponent } from './components/upload/upload.component';
import { ReplyComponent } from './components/reply/reply.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsComponent, GlobalComponent, PostComponent, UploadComponent, ReplyComponent],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule, SharedComponentsModule]
})
export class PostsModule {}
