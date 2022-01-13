import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartguardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isUserLoggedIn().getValue() == true)
      return true;
    this.snackBar.open("You need to be logged-in to access your cart!", "", {duration: 2500});
    return this.router.navigate(["login"]);
  }
}
