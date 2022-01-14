import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  pathToImages = "../../assets/";
  slika1 = this.pathToImages + "logo-1.png";
  slika2 = this.pathToImages + "logo-2-him.png";
  constructor() { }

  ngOnInit(): void {
  }

}
