import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { AuthComponent } from './auth/auth.component';

import {Routes} from '@angular/router';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
  {path : 'homepage', component: HomepageComponent},
  {path : 'auth', component : AuthComponent},
  {path : 'register', component: RegisterComponent}, 

]
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderMenuComponent,
    FooterMenuComponent,
    AuthComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
