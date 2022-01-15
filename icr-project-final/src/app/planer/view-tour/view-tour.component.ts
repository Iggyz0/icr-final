import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TourModel } from 'src/app/models/TourModel';

@Component({
  selector: 'app-view-tour',
  templateUrl: './view-tour.component.html',
  styleUrls: ['./view-tour.component.css']
})
export class ViewTourComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TourModel,
    private dialogRef: MatDialogRef<ViewTourComponent>
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
