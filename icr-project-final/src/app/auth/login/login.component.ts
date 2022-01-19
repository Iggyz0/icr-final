import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(forma: NgForm) {
    let korisnik = this.userService.findUserByUsername(forma.value.username);

    if (korisnik && korisnik.password === forma.value.password) {
      this.authService.logIn(korisnik);

      this.snackBar.open('Login successful!', '', { duration: 2500 });
      this.router.navigateByUrl('/welcome');
    } else {
      this.snackBar.open('Trazeni korisnik ne postoji', '', { duration: 2500 });
    }
  }
}
