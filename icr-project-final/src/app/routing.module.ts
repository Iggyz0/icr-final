import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthguardService } from './services/guards/authguard.service';
import { ProfileguardService } from './services/guards/profileguard.service';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthguardService] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthguardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileguardService] },
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
