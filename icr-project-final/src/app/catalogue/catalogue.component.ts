import { LabelType, Options } from '@angular-slider/ngx-slider';
import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';
import { ExhibitModel } from '../models/ExhibitModel';
import { ExhibitsService } from '../services/exhibits.service';
import { ShowpieceService } from '../services/showpiece.service';
import { ToursService } from '../services/tours.service';
import { UserService } from '../services/user.service';

declare var $: any;

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, AfterViewInit  {

  items: ExhibitModel[] = [];
  displayedItems: ExhibitModel[] = [];
  p: number = 1; // for pagination
  searchValue: string = '';
  
  isChecked: boolean = false;
  typeValue: string = 'any';
  showpieceTypeValue: string = 'any';
  allTypes: string[];
  allShowpieceTypes: string[];

  minValueScore: number = 0;
  maxValueScore: number = 5;
  optionsScore: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return (
            "<span style='color: orange;'>" + value + '</span>'
          );
        case LabelType.High:
          return (
            "<span style='color: orange;'>" + value + '</span>'
          );
        default:
          return "<span  style='color: orange;'>" + value + "</span>";
      }
    },
  };

  numberOfExhibitsValue: number = -1;
  tourTimeTotal: number = -1;

  constructor(private exhibitsService: ExhibitsService,
    private userService: UserService,
    private toursService: ToursService,
    private showpieceService: ShowpieceService) { }

  ngAfterViewInit(): void {
    $(document).ready(function() {
      $('.carousel').carousel();
      // document.querySelectorAll(".picContainer").forEach(container => container.firstElementChild.classList.add("active"));
    });
  }
  
  ngOnInit(): void {
    this.items = this.exhibitsService.getAllItems();

    for (let i = 0; i < this.items.length; i++) {
      let oldShowpiecesIds = this.items[i].eksponati.map((prev) => prev.id );
      let neededShowpieces = this.showpieceService.getAllItems().filter((elem) => { return oldShowpiecesIds.includes(elem.id) });
      neededShowpieces.forEach((showpiece) => showpiece.ukupnaOcena = (showpiece.recenzije.reduce((prev, curr) => { return prev = prev + curr.rating }, 0)) / showpiece.recenzije.length );
      this.items[i].prosecnaOcena = neededShowpieces.reduce((prev, curr) => prev = prev + (Number.isFinite(curr.ukupnaOcena) ? curr.ukupnaOcena : 0) , 0) / neededShowpieces.length;
    }
    
    // carousel needs to be restarted each time the page reloads
    
    this.displayedItems = this.items;
    this.findUniqueTypesOfExhibitions();
    this.setupPriceSlider();
  }

  findUniqueTypesOfExhibitions() {
    this.allTypes = [...new Set(this.displayedItems.map((item) => item.vrstaPostavke))];
    let showpiecesFromExhibit = [];
    this.items.forEach(exModel => showpiecesFromExhibit.push(...exModel.eksponati));
    let uniqueShowpieceTypes = [...new Set(showpiecesFromExhibit.map(showpiece => showpiece.vrsta))];
    this.allShowpieceTypes = uniqueShowpieceTypes;
  }

  findHighestPricedExhibition(exhibitions: ExhibitModel[]): ExhibitModel {
    return exhibitions.reduce((prev, curr) => {
      return ((prev.cena > curr.cena) ? prev : curr)
    }, );
  }

  setupPriceSlider() {
    let maxPrice = (this.findHighestPricedExhibition(this.displayedItems)).cena;
    if (maxPrice != null) {
      this.maxValuePrice = maxPrice;
      this.optionsPrice.ceil = maxPrice;
    } else {
      this.maxValuePrice = 0;
      this.maxValuePrice = 10000;
    }
  }

  // -----------------------------------------------------------------   BIG SEARCH START  ----------------------------------------------------------------
  search() {
    
    let search = this.searchValue.trim().toLowerCase();
    let arr = this.items;
    this.p = 1;

    if (this.isChecked) {
      this.typeValue = 'any';
      let currUser = this.userService.getCurrentUser();
      if (currUser != null) { 
          if (currUser.omiljenePostavke.length > 0) {
            arr = arr.filter((exhibition) => { return currUser.omiljenePostavke.includes(exhibition.vrstaPostavke)});
          }
      }
    }

    if (this.numberOfExhibitsValue != -1) {
      arr = arr.filter((exhibition) => { return exhibition.eksponati.length <= this.numberOfExhibitsValue; });
    } else {
      this.numberOfExhibitsValue = -1;
    }

    if (this.tourTimeTotal != -1) {
      arr = arr.filter((exhibition) => { return exhibition.procenjenoVremeObilaska <= this.tourTimeTotal*60; });
    } else {
      this.tourTimeTotal = -1;
    }
    
    if (search == '')
      this.displayedItems = this.items;
    else {
      arr = this.items.filter(obj => { return (obj.vrstaPostavke.toLowerCase().includes(search) || obj.ime.toLowerCase().includes(search) ); });
      this.p = 1;
    }

    if (this.typeValue != 'any') {
      arr = arr.filter((product) => {
        return product.vrstaPostavke == this.typeValue;
      });
    } else {
      this.typeValue = 'any';
    }

    if (this.showpieceTypeValue != 'any') {
      arr = arr.filter((exhibitModel) => { return exhibitModel.eksponati.forEach((eksponat) => { return eksponat.vrsta == this.showpieceTypeValue }) });
    }

    arr = arr.filter((product) => {
      return (
        product.prosecnaOcena <= this.maxValueScore &&
        product.prosecnaOcena >= this.minValueScore
      );
    });

    arr = arr.filter((item) => {
      return (
        item.cena <= this.maxValuePrice &&
        item.cena >= this.minValuePrice
      );
    });

    this.displayedItems = arr;

    $(document).ready(function() {
      $('.carousel').carousel();
      // document.querySelectorAll(".picContainer").forEach(container => container.firstElementChild.classList.add("active"));
    });

    this.sortData({
      active: this.sortValue,
      direction: this.sortValueDirection,
    });

    
  }

  // -----------------------------------------------------------------   BIG SEARCH END  ------------------------------------------------------------------

  viewExhibition(id: string) {
    this.exhibitsService.viewExhibitionShowpieces(id);
  }

  // ------------ MAT SORT START

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
          return this.compare(a.vrstaPostavke, b.vrstaPostavke, isAsc);
        case 'price':
          return this.compare(a.cena, b.cena, isAsc);
        case 'score':
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
// -------------- MAT SORT END

// -------------- SORT BY PRICE START
minValuePrice: number = 1;
maxValuePrice: number = 100000;
optionsPrice: Options = {
  floor: 0,
  ceil: this.maxValuePrice,
  translate: (value: number, label: LabelType): string => {
    switch (label) {
      case LabelType.Low:
        return (
          "<span style='color: orange;'>" + value + '</span>'
        );
      case LabelType.High:
        return (
          "<span style='color: orange;'>" + value + '</span>'
        );
      default:
        return "<span  style='color: orange;'>" + value + "</span>";
    }
  },
};

// -------------- SORT BY PRICE END

addExhibitToTour(item : ExhibitModel){
  this.toursService.addExhibitToTour(item);
}

}