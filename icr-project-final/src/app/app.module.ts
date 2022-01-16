import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { RatingModule } from 'ng-starrating';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { ProfileComponent } from './profile/profile.component';
import { PlanerComponent } from './planer/planer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ViewTourComponent } from './planer/view-tour/view-tour.component';
import { ExhibitsComponent } from './catalogue/exhibits/exhibits.component';
import { ExhibitSinglePageComponent } from './catalogue/exhibit-single-page/exhibit-single-page.component';
import { AddToTourComponent } from './add-to-tour/add-to-tour.component';
import { AddExhibitDialogComponent } from './catalogue/add-exhibit-dialog/add-exhibit-dialog.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { EditreviewComponent } from './myreviews/editreview/editreview.component';
<<<<<<< HEAD
import { StringTruncationPipe } from './string-trunc';
=======
import { ExhibitCreationComponent } from './planer/exhibit-creation/exhibit-creation.component';
>>>>>>> origin/StefanTex

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PagenotfoundComponent,
    UserprofileComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PlanerComponent,
    AboutUsComponent,
    CatalogueComponent,
    ExhibitsComponent,
    ExhibitSinglePageComponent,
    AddToTourComponent,
    ViewTourComponent,
    AddExhibitDialogComponent,
    MyreviewsComponent,
    EditreviewComponent,
<<<<<<< HEAD
    StringTruncationPipe
=======
    ExhibitCreationComponent
>>>>>>> origin/StefanTex
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    NgxSliderModule,
    NgxPaginationModule,
    RatingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
