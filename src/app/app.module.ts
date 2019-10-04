import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { environment } from 'src/environments/environment';
import { InViewportModule } from 'ng-in-viewport';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';
import { CreditsComponent } from './views/credits/credits.component';
import { LandingComponent } from './views/landing/landing.component';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './modules/shared-components/shared-components.module';

@NgModule({
  declarations: [AppComponent, UserInfoComponent, ProfileEditComponent, CreditsComponent, LandingComponent],
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
    AngularFirePerformanceModule, // Firebase Performance module
    SharedComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CommonModule, ReactiveFormsModule]
})
export class AppModule {}
// TODO: Move most services to NgRx
