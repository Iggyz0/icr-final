import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorExists = false;
  errorText = "";

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let user: UserModel = {
      "username": form.value.username, 
      "password": form.value.password,
      "email": form.value.email, 
      "lastName": form.value.lastName,
      "firstName": form.value.firstName,
      "phone": form.value.phone,
      "address": {
        "country": form.value.country,
        "city": form.value.city,
        "street": form.value.street,
        "number": form.value.number,
        "zipCode": form.value.zipCode
      },
      "dateCreated": new Date()
    }

    this.authService.registerUser( user ).subscribe(data => {
      if(data != null) {
        this._snackBar.open("Successfully registered! You will be redirected to the login page shortly...", "", {duration: 2500});
        setTimeout(() => {
          form.reset();
          this.router.navigate(["login"]);
        }, 2500);
      }
      else {
        this._snackBar.open("Username already exists. Please choose another one...", "", {duration: 2500});
      }
    });
  }
}
