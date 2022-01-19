import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  onSubmit(forma: NgForm) {
    if(
    this.userService.insertUser({
      ime: forma.value.ime,
      prezime: forma.value.prezime,
      username: forma.value.username,
      password: forma.value.password,
      kontaktPodaci: {
        adresa: forma.value.adresa,
        email: forma.value.email,
        telefon: forma.value.telefon,
      },
      id: 0,
      omiljenePostavke: [],
      planer: []
    })){
      this.snackBar.open("Successfully registered! You will be redirected to the login page.", "", { duration: 2500});
      setTimeout(() => {
        forma.reset();
        this.router.navigateByUrl('/login');
      }, 2500);
    }
    else{
      this.snackBar.open("The user already exists!", "", { duration: 2500});
    }

  }
}
