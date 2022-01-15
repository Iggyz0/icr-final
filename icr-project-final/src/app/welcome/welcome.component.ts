import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  images = [1,2,3].map(n => { return `../../../assets/Slider/slider-${n}.jpg` });

  constructor(){} 

  ngOnInit(): void {
    // carousel needs to be restarted each time the page reloads
    $(document).ready(function() {
      $('.carousel').carousel();
   });
  }
  

}
