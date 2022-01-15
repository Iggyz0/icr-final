import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TourModel } from '../models/TourModel';
import { UserModel } from '../models/userModel';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: UserModel ;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let username;
    if( username = this.localStorage.getLocalStorageItem("username")){
      
      const korisnik = this.userService.findUserByUsername(username);
      if(korisnik)
        this.user = korisnik;

    }else{
      this.authService.logOut();
      this.snackBar.open("Sorry, an error occurred. Please, log in again.","", {duration:2500});
      this.router.navigateByUrl("/login");
    }
  }

  updateUserValue( user: UserModel){
    this.user = user;
    // console.log(this.user);
  }

  updateUserPlaner( planer: TourModel[]){
    this.user.planer = planer;
    // console.log(this.user.planer);
  }
}
