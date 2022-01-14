import { AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserModel } from './models/userModel';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/localstorage.service';
import { UserService } from './services/user.service';
import { StarRatingComponent } from 'ng-starrating';
import { BehaviorSubject } from 'rxjs';
import { RouteInfoService } from './services/route-info.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'icr-project';

  isDarkTheme: boolean = true;
  navbarfixed: boolean = false;
  isWelcomePage: boolean = true;

  @HostListener('window:scroll',['$event']) onScroll() {
    if(window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }

  korisnik$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private routeInfo: RouteInfoService
  ){

  }
  ngAfterViewInit(): void {
    this.korisnik$ = this.authService.getCurrentUser();
  }
  
  ngOnInit(): void {
    this.korisnik$ = this.authService.getCurrentUser();
    this.getThemePreferenceFromLocalStorage();

    this.router.events.subscribe((event) => {
      if (this.router.url == "/" || this.router.url == "/welcome") {
        this.isWelcomePage = true;
      }
      else {
        this.isWelcomePage = false;
      }
    });

    this.routeInfo.monitorRouteChange();
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
