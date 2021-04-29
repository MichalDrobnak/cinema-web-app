// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// COMPONENTS
import { AppComponent } from './app.component';

// MODULES
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';
import { CinemaManagementModule } from './modules/cinema-management/cinema-management.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TicketBuyingModule } from './modules/ticket-buying/ticket-buying.module';
import { UserInteractionModule } from './modules/user-interaction/user-interaction.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AuthenticationModule,
    MaterialModule,
    SharedModule,
    CinemaManagementModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    TicketBuyingModule,
    UserInteractionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
