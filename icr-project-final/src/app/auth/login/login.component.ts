import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private localStorageService: LocalstorageService, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let user: UserModel = {
      "username": form.value.username, 
      "password": form.value.password
    }

    this.authService.loginUser(user).subscribe((response: UserModel) => {
      
      if (response != null) {
        this.localStorageService.setLocalStorageItem("username", user.username);

        this.userService.setCurrentUser(response);

        this.authService.logTheUserIn();

        this.router.navigate(["welcome"]);
      }
      else {
        this._snackBar.open("Something went wrong. Please check your log-in credentials.", "", {duration: 2500});
      }
    });
  }

}
