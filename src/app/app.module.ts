import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { MarkdownPipe } from 'src/app/pipes/markdown.pipe';
import { InViewportModule } from 'ng-in-viewport';
import { UploadComponent } from './components/upload/upload.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownPipe, // Pipe for Markdown parsing
    UploadComponent,
    PostComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Module for new post and new comment forms
    InViewportModule, // Module for checking if component is in viewport
    AngularFireModule.initializeApp(environment.firebaseConfig), // Firebase basic module
    AngularFirestoreModule, // Firestore module
    AngularFireAuthModule, // Firebase Auth module
    AngularFireStorageModule // Firebase Storage module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
