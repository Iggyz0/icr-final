import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileguardService {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //TODO: Check if it works!
    if(this.authService.getCurrentUser().getValue())
      return true;
    this.snackBar.open("You need to be logged in to access your profile!", "", {duration: 2500});
    return this.router.navigateByUrl("/login");
  }
}
