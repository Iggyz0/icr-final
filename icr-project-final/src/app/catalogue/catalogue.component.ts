import { LabelType, Options } from '@angular-slider/ngx-slider';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';
import { ExhibitModel } from '../models/ExhibitModel';
import { ExhibitsService } from '../services/exhibits.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, AfterViewInit {

  items: ExhibitModel[] = [];
  displayedItems: ExhibitModel[] = [];
  p: number = 1; // for pagination
  searchValue: string = '';

  constructor(private exhibitsService: ExhibitsService) { }
  
  ngAfterViewInit(): void {
    this.items = this.exhibitsService.getAllItems();
    this.displayedItems = this.items;
  }

  ngOnInit(): void {
    
  }

  search() {
    this.p = 1;
    if (this.searchValue == '')
      this.displayedItems = this.items;
    else {
      this.displayedItems = this.items.filter(search => { return search.vrstaPostavke.toLowerCase().includes(this.searchValue); });
      this.p = 1;
    }
  }

  viewExhibition(id: string) {
    this.exhibitsService.viewExhibitionShowpieces(id);
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
          return this.compare(a.vrstaPostavke, b.vrstaPostavke, isAsc);
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