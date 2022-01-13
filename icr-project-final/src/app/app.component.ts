import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './models/userModel';
import { AuthService } from './services/auth.service';
import { LocalstorageService } from './services/localstorage.service';
import { UserService } from './services/user.service';
import { StarRatingComponent } from 'ng-starrating';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private userService: UserService,
    private router: Router,
    private cartService:CartService
    ) {}

  isLoggedIn$: any;
  isDarkTheme: boolean = false;
  isWelcomePage: boolean = true;
  amountInCart$: any;
  currentUser: any;

  title = 'BIS-project';

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isUserLoggedIn();

    if (this.localStorageService.getLocalStorageItem("username") != null && this.localStorageService.getLocalStorageItem("username").length > 0) {
      this.userService.getUserByUsernameFromTheServer(this.localStorageService.getLocalStorageItem("username")).subscribe((user: UserModel) => {
        this.userService.setCurrentUser(user);

      }).add(() => {});
    }

    this.getThemePreferenceFromLocalStorage();

    // sub to the router instance so we can check the current route when router is called to change the route
    // if the current route is welcome page (or "/" or "") we set the tool-bar class to make it transparent
    // if the current route is any other, then remove the class that makes the tool-bar transparent
    this.router.events.subscribe((event) => {
      if (this.router.url == "/" || this.router.url == "/welcome") {
        this.isWelcomePage = true;
      }
      else {
        this.isWelcomePage = false;
      }
    });

    this.amountInCart$ = this.cartService.geter();
  }

  ngAfterViewInit(): void {
    this.currentUser = this.userService.getCurrentUsername();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme)
      this.localStorageService.setLocalStorageItem("theme", "dark");
    else
      this.localStorageService.setLocalStorageItem("theme", "light");
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn$ = this.authService.isUserLoggedIn();
    this.router.navigate(['/login']);
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
