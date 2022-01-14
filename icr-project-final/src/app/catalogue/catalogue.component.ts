import { LabelType, Options } from '@angular-slider/ngx-slider';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { ShowpieceService } from '../services/showpiece.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, AfterViewInit {

  items: ShowPieceModel[] = [];
  displayedItems: ShowPieceModel[] = [];
  p: number = 1; // for pagination
  searchValue: string = '';

  constructor(private showpieceService: ShowpieceService) { }
  
  ngAfterViewInit(): void {
    this.items = this.showpieceService.getAllItems();
    this.displayedItems = this.showpieceService.getAllItems();
  }

  ngOnInit(): void {
    
  }

  search() {
    this.p = 1;
    if (this.searchValue == '')
      this.displayedItems = this.items;
    else {
      this.displayedItems = this.items.filter(search => { return search.naziv.toLowerCase().includes(this.searchValue); });
      this.p = 1;
    }
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
  translate: (value: number, label: LabelType): string => {
    switch (label) {
      case LabelType.Low:
        return (
          "<b style='color: #2697e7;'>Min:</b> <span  style='color: #2697e7;'>$</span>" +
          "<span style='color: #2697e7;'>" +
          value +
          '</span>'
        );
      case LabelType.High:
        return (
          "<b style='color: #2697e7;'>Max:</b> <span  style='color: #2697e7;'>$</span>" +
          "<span style='color: #2697e7;'>" +
          value +
          '</span>'
        );
      default:
        return "<span  style='color: #2697e7;'>$</span>" + value;
    }
  },
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