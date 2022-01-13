import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@google/model-viewer';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isLoggedIn$: any;

  constructor(private router: Router,
    private authService: AuthService) { }
  

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isUserLoggedIn();
  }

  goNavigate(url: string) {
    this.router.navigate([url]);
  }

}
