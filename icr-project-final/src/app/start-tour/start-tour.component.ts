import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { TourModel } from '../models/TourModel';

@Component({
  selector: 'app-start-tour',
  templateUrl: './start-tour.component.html',
  styleUrls: ['./start-tour.component.css']
})
export class StartTourComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TourModel,
    private dialogRef: MatDialogRef<StartTourComponent>
  ) { }

  allShowpiecesFromTour: ShowPieceModel[] = [];

  @ViewChild('carouselInner') viewChild: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.allShowpiecesFromTour = Array.from(this.data.eksponat);
  }
  
  ngAfterViewInit(): void {
    this.viewChild.nativeElement.firstElementChild.classList.add("active");
  }

  close() {
    this.dialogRef.close();
  }

}
