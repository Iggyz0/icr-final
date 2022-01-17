import { Component, OnInit } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';
import { ShowPieceModel } from 'src/app/models/ShowpieceModel';
import { ShowpieceService } from 'src/app/services/showpiece.service';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute } from '@angular/router';
import { ExhibitsService } from 'src/app/services/exhibits.service';
import { ExhibitModel } from 'src/app/models/ExhibitModel';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-exhibits',
  templateUrl: './exhibits.component.html',
  styleUrls: ['./exhibits.component.css']
})
export class ExhibitsComponent implements OnInit {

  exhibitionId: string = "";

  exhibition: ExhibitModel = null;
  items: ShowPieceModel[] = [];
  displayedItems: ShowPieceModel[] = [];
  p: number = 1; // for pagination
  searchValue: string = '';

  uniqueCountries: string[] = [];
  countryValue: string = '';

  tourTimeTotal: number = -1;

  constructor(private route: ActivatedRoute, private exhibitsService: ExhibitsService, private showpieceService: ShowpieceService, private tourService: ToursService) { }
  
  ngAfterViewInit(): void {
    this.exhibition = this.exhibitsService.findItemByID(parseInt(this.exhibitionId));
    this.items = this.exhibition.eksponati;
    this.displayedItems = this.items;
    this.findUniqueCountries();
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => { this.exhibitionId = val["id"] });
  }

  findUniqueCountries() {
    this.uniqueCountries = [...new Set(this.displayedItems.map((item) => item.zemljaPorekla))];
  }

  viewExhibitDetails(id: string) {
    this.showpieceService.viewDetails(id);
  }

  addShowpieceToTour(showpiece: ShowPieceModel): any {
    return this.tourService.addToTour(showpiece);
  }

  search() {
    let search = this.searchValue.trim().toLowerCase();
    let arr = this.items;
    this.p = 1;

    if (search == '')
      this.displayedItems = this.items;
    else {
      arr = this.items.filter(obj => { return obj.naziv.toLowerCase().includes(search); });
      this.p = 1;
    }

    if (this.tourTimeTotal != -1) {
      arr = arr.filter((showpiece) => { return showpiece.vremeObilaska <= this.tourTimeTotal*60; });
    } else {
      this.tourTimeTotal = -1;
    }

    if (this.countryValue.trim() != "") {
      arr = arr.filter((showpiece) => { return showpiece.zemljaPorekla == this.countryValue});
    }

    this.displayedItems = arr;
    this.sortData({
      active: this.sortValue,
      direction: this.sortValueDirection,
    });

  }

  // ------------ SORT START

  sortValue: string = '';
  sortValueDirection: SortDirection = '';

  sortData(sort: Sort) {
    this.sortValue = sort.active;
    this.sortValueDirection = sort.direction;

    const data = this.items.slice();
    if (!sort.active || sort.direction === '') {
      this.items = data;
      return;
    }
    
    this.displayedItems = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.naziv, b.naziv, isAsc);
        case 'price':
          return this.compare(a.cena, b.cena, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(
    a: number | string | DoubleRange,
    b: number | string | DoubleRange,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
// -------------- SORT END

// -------------- SORT BY PRICE START
minValuePrice: number = 1;
maxValuePrice: number = 1000;
optionsPrice: Options = {
  floor: 0,
  ceil: 1000,
  // translate: (value: number, label: LabelType): string => {
  //   switch (label) {
  //     case LabelType.Low:
  //       return (
  //         "<span style='color: orange;'>Min:</span> <span  style='color: orange;'>$</span>" +
  //         "<span style='color: orange;'>" +
  //         value +
  //         '</span>'
  //       );
  //     case LabelType.High:
  //       return (
  //         "<span style='color: orange;'>Max:</span> <span  style='color: orange;'>$</span>" +
  //         "<span style='color: orange;'>" +
  //         value +
  //         '</span>'
  //       );
  //     default:
  //       return "<span  style='color: orange;'>$</span>" + value;
  //   }
  // },
};

searchByPrice() {
  this.p = 1;

  this.displayedItems = this.items;

  this.displayedItems = this.displayedItems.filter((item) => {
    return (
      item.cena <= this.maxValuePrice &&
      item.cena >= this.minValuePrice
    );
  });
}
// -------------- SORT BY PRICE END

}
