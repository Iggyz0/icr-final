import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowPieceModel } from 'src/app/models/ShowpieceModel';
import { ShowpieceService } from 'src/app/services/showpiece.service';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-exhibit-single-page',
  templateUrl: './exhibit-single-page.component.html',
  styleUrls: ['./exhibit-single-page.component.css']
})
export class ExhibitSinglePageComponent implements OnInit, AfterViewInit {

  constructor
  (
    private route: ActivatedRoute, 
    private showpieceService: ShowpieceService,
    private tourService: ToursService
  ) { }

  showpieceId: string = "";
  showpiece: ShowPieceModel = null;
  dialogOpen: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(val => { this.showpieceId = val["id"] });
    this.showpiece = this.showpieceService.findItemByID(parseInt(this.showpieceId));
  }
  
  ngAfterViewInit(): void {
    
  }

  addShowpieceToTour(showpiece: ShowPieceModel): any {
    return this.tourService.addToTour(showpiece);
  }

}
