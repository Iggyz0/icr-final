import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteInfoService {
  
  currentActiveLink: string = '';
  previousActiveLink: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.previousActiveLink = this.getActiveUrlPath();
    this.currentActiveLink = this.previousActiveLink;

    console.log("konstruktor vrednosti:");
    console.log("prev: ", this.previousActiveLink);
    console.log("cur: ", this.currentActiveLink);
    
  }

  monitorRouteChange() {
    // detect active route - works
    console.log("change deteaacted");
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousActiveLink = this.currentActiveLink;
        this.currentActiveLink = this.getActiveUrlPath();
        
        let prev = this.getHtmlElement(this.previousActiveLink.substring(1));
        let cur = this.getHtmlElement(this.currentActiveLink.substring(1));
        
        if (prev != null) {
          prev.classList.remove("activeRouteLink");
        }
        if (cur != null) {
          cur.classList.add("activeRouteLink");
        }
      }
    });
  }

  getActiveUrlPath(): string {
    let path = this.router.url.split("?")[0];
    return path;
  }

  getHtmlElement(id: string): HTMLInputElement {
    if (id == '' || id == null) {
      id = "welcome";
    }
    return (<HTMLInputElement>document.getElementById(id));
  }
}
