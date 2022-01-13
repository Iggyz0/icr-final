import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  images = [1,2,3].map(n => { return `../../../assets/Slider/slider-${n}.jpg` });

  constructor(){} 

  ngOnInit(): void {
        
  }
  

}
