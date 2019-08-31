import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InViewportModule } from 'ng-in-viewport';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule, // Module for checking if component is in viewport
    AngularFireModule.initializeApp(environment.firebaseConfig), // Firebase basic module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
