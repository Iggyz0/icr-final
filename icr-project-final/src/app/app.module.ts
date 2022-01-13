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
import { ProductsComponent } from './products/products.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';

import { AuthService } from './services/auth.service';
import { LocalstorageService } from './services/localstorage.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { AuthguardService } from './services/guards/authguard.service';
import { ComponentaccessService } from './services/guards/componentaccess.service';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ReviewService } from './services/review.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { EditReviewComponent } from './userprofile/edit-review/edit-review.component';
import { CartguardService } from './services/guards/cartguard.service';
import { EditOrderComponent } from './userprofile/edit-order/edit-order.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PagenotfoundComponent,
    ProductsComponent,
    UserprofileComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    ProductDetailsComponent,
    EditReviewComponent,
    EditOrderComponent
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
  providers: [
    AuthService,
    LocalstorageService,
    UserService,
    ProductService,
    AuthguardService,
    ComponentaccessService,
    ReviewService,
    CartService,
    OrderService,
    CartguardService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
