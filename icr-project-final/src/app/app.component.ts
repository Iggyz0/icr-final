import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './models/userModel';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/localstorage.service';
import { UserService } from './services/user.service';
import { StarRatingComponent } from 'ng-starrating';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'icr-project';

  isDarkTheme: boolean = true;

  korisnik$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ){

  }
  ngAfterViewInit(): void {
    this.korisnik$ = this.authService.getCurrentUser();
  }
  ngOnInit(): void {
    this.korisnik$ = this.authService.getCurrentUser();
    this.getThemePreferenceFromLocalStorage();
  }

  logout(){
    this.authService.logOut();
    this.router.navigateByUrl("/login");
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme)
      this.localStorageService.setLocalStorageItem("theme", "dark");
    else
      this.localStorageService.setLocalStorageItem("theme", "light");
  }

  getThemePreferenceFromLocalStorage() {
    if(this.localStorageService.getLocalStorageItem("theme")) {
      if(this.localStorageService.getLocalStorageItem("theme")?.valueOf() == "light") {
        this.isDarkTheme = false;
      }
      else if (this.localStorageService.getLocalStorageItem("theme")?.valueOf() == "dark")
        this.isDarkTheme = true;
      else
        this.isDarkTheme = false;
    }
  }

}
