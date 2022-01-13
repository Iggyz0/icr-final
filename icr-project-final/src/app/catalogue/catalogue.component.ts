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
  p: number = 1; // for pagination
  searchValue: string = '';

  constructor(private showpieceService: ShowpieceService) { }
  
  ngAfterViewInit(): void {
    this.items = this.showpieceService.getAllItems();
  }

  ngOnInit(): void {
    
  }

  search() {

  }

  // ------------ Sort

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

    this.items = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'naziv':
          return this.compare(a.naziv, b.naziv, isAsc);
        // case 'ocena':
        //   return this.compare(a.ocena, b.ocena, isAsc);
        case 'cena':
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

}
