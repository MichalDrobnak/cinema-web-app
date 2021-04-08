// ANGULAR
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { environment } from '../environments/environment'

// FIREBASE
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'

// MATERIAL
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatChipsModule } from '@angular/material/chips'

// COMPONENTS
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ShortStringPipe } from './pipes/short-string.pipe'
import { ScreeningComponent } from './components/screening/screening.component'
import { ScreeningDetailComponent } from './components/screening-detail/screening-detail.component'
import { PluralPipe } from './pipes/plural.pipe'
import { ManagementComponent } from './components/management/management.component'
import { MovieManagementComponent } from './components/movie-management/movie-management.component'
import { ScreeningManagementComponent } from './components/screening-management/screening-management.component'
import { MovieCardComponent } from './components/movie-card/movie-card.component'
import { AddMovieComponent } from './components/add-movie/add-movie.component'
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component'
import { FileSizePipe } from './pipes/file-size.pipe'
import { FileUploadDndDirective } from './directives/file-upload-dnd.directive'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent,
    ShortStringPipe,
    ScreeningComponent,
    ScreeningDetailComponent,
    PluralPipe,
    ManagementComponent,
    MovieManagementComponent,
    ScreeningManagementComponent,
    MovieCardComponent,
    AddMovieComponent,
    FileUploaderComponent,
    FileSizePipe,
    FileUploadDndDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    AngularFireStorageModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
