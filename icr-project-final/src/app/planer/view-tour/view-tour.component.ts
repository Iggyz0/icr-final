import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TourModel } from 'src/app/models/TourModel';

@Component({
  selector: 'app-view-tour',
  templateUrl: './view-tour.component.html',
  styleUrls: ['./view-tour.component.css']
})
export class ViewTourComponent implements OnInit {

  showPiecesToRemove = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewTourComponent>
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(this.showPiecesToRemove);
  }

  remove(showpieceID: number){
    this.showPiecesToRemove.push(showpieceID);
    console.log(this.data.tour);
    //NOTE: ne radi!
    // this.data.tour = this.data.tour.eksponat.filter( exponat => exponat.value.id != showpieceID);
  }

}
