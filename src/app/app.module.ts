import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Router, RouterModule, Routes } from "@angular/router";

// Plugins
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

// Components
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { CardOverlayComponent } from './components/dashboard/card-overlay/card-overlay.component';
import { TableActivityComponent } from './components/dashboard/table-activity/table-activity.component';
import { HeaderComponent } from './components/dashboard/header/header.component';



const appRoutes: Routes =[
  {path: 'dashboard', component: DashboardViewComponent},
  {path: '', component: DashboardViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    CardOverlayComponent,
    TableActivityComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
