import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductsComponent } from './products/products.component';
import { AuthguardService } from './services/guards/authguard.service';
import { CartguardService } from './services/guards/cartguard.service';
import { ComponentaccessService } from './services/guards/componentaccess.service';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthguardService] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthguardService] },
  { path: 'profile', component: UserprofileComponent, canActivate: [ComponentaccessService] },
  { path: 'cart', component: CartComponent, canActivate: [CartguardService] },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
exports: [
    RouterModule
]
})
export class RoutingModule { }
