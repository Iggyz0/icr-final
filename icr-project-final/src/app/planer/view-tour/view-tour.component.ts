import { I } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowPieceModel } from 'src/app/models/ShowpieceModel';
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

    let set: Set<ShowPieceModel> = this.data.tour.eksponat;
    for(let item of set.values()){
      if(item.id == showpieceID)
        this.data.tour.eksponat.delete(item);
    }
  }

}
