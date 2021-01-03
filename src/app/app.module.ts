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

// Components - Dashboard
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { CardOverlayComponent } from './components/dashboard/card-overlay/card-overlay.component';
import { TableActivityComponent } from './components/dashboard/table-activity/table-activity.component';
import { HeaderComponent } from './components/dashboard/header/header.component';

// Redirect 404
import { FourZeroFourComponent } from './components/config/four-zero-four/four-zero-four.component';
import { LineChartComponent } from './components/dashboard/line-chart/line-chart.component';
import { PetProfileComponent } from './components/dashboard/pet/pet-profile/pet-profile.component';
import { PetListComponent } from './components/dashboard/pet/pet-list/pet-list.component';


const appRoutes: Routes =[
  { path: 'dashboard', component: DashboardViewComponent},
  { path: 'pets', component: PetListComponent},
  { path: '', component: DashboardViewComponent},
  { path: 'not-found', component: FourZeroFourComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    CardOverlayComponent,
    TableActivityComponent,
    HeaderComponent,
    FourZeroFourComponent,
    LineChartComponent,
    PetProfileComponent,
    PetListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
