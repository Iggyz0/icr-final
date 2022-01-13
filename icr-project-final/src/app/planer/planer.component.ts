import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TourModel } from '../models/TourModel';

@Component({
  selector: 'app-planer',
  templateUrl: './planer.component.html',
  styleUrls: ['./planer.component.css']
})
export class PlanerComponent implements OnInit {

  @Input() tours!: TourModel[] ;
  @Output() toursUpdate = new EventEmitter<TourModel[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){

  }

  updateParentTours( value: TourModel[]){
    this.toursUpdate.emit(value);
  }

}
