import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MnFullpageModule } from 'ngx-fullpage';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {Router, RouterModule} from '@angular/router';
export const firebaseConfig = {

  apiKey: "AIzaSyCEKkej88NEz1ttaP01yY9a3Qd6omUgiKc",
  authDomain: "beta-d3d7e.firebaseapp.com",
  databaseURL: "https://beta-d3d7e.firebaseio.com",
  projectId: "beta-d3d7e",
  storageBucket: "beta-d3d7e.appspot.com",
  messagingSenderId: "449484223591"

};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MnFullpageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule,
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
