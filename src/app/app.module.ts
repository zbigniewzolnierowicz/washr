import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { environment } from 'src/environments/environment';
import { MarkdownPipe } from 'src/app/pipes/markdown.pipe';
import { InViewportModule } from 'ng-in-viewport';
import { UploadComponent } from './components/upload/upload.component';
import { PostComponent } from './components/post/post.component';
import { ReplyComponent } from './components/reply/reply.component';
import { GlobalComponent } from './views/postList/global/global.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { BadgeComponent } from './components/badge/badge.component';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';
import { CreditsComponent } from './views/credits/credits.component';
import { ImageComponent } from './components/image/image.component';
import { WysiwygComponent } from './components/wysiwyg/wysiwyg.component';
import { LandingComponent } from './views/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownPipe, // Pipe for Markdown parsing
    UploadComponent,
    PostComponent,
    ReplyComponent,
    GlobalComponent,
    UserInfoComponent,
    BadgeComponent,
    ProfileEditComponent,
    CreditsComponent,
    ImageComponent,
    WysiwygComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Module for new post and new comment forms
    InViewportModule, // Module for checking if component is in viewport
    AngularFireModule.initializeApp(environment.firebaseConfig), // Firebase basic module
    AngularFirestoreModule, // Firestore module
    AngularFireAuthModule, // Firebase Auth module
    AngularFireAuthGuardModule, // Firebase Auth Guard module
    AngularFireStorageModule, // Firebase Storage module
    AngularFirePerformanceModule // Firebase Performance module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
// TODO: Move most services to NgRx
