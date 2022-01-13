import { Component, OnInit } from '@angular/core';
import '@google/model-viewer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isLoggedIn$: any;

  constructor(){} 

  ngOnInit(): void {
  }


}
