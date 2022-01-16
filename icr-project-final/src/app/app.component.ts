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

  // @HostListener('df-response-received', ['$event']) update(payload: any){
  //   const dialogFlowMessenger = document.querySelector('df-messenger');
  //   const prtljag = payload.detail.response.queryResult.fulfillmentMessages[0].payload;
  //   dialogFlowMessenger.renderCustomCard(prtljag);
  // }

  korisnik$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private routeInfo: RouteInfoService,
    private userService: UserService
  ){

  }
  ngAfterViewInit(): void {
    //NOTE: Following code is a security breach, it's only there to keep the user logged in whilst reloading/refreshing the page!
    let username : string;
    if( (username = this.localStorageService.getLocalStorageItem('username')) != undefined)
      this.authService.logIn(this.userService.findUserByUsername(username));
    this.korisnik$ = this.authService.getCurrentUser();
  }
  
  ngOnInit(): void {
    //NOTE: Following code is a security breach, it's only there to keep the user logged in whilst reloading/refreshing the page!
    let username : string;
    if( (username = this.localStorageService.getLocalStorageItem('username')) != undefined)
      this.authService.logIn(this.userService.findUserByUsername(username));

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
