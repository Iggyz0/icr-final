import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShowPieceModel } from 'src/app/models/ShowpieceModel';

@Component({
  selector: 'app-view-tour',
  templateUrl: './view-tour.component.html',
  styleUrls: ['./view-tour.component.css']
})
export class ViewTourComponent implements OnInit {
  showPiecesToRemove = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewTourComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(this.data.tour);
  }

  remove(showpieceID: number){
    this.showPiecesToRemove.push(showpieceID);

    let set: Set<ShowPieceModel> = this.data.tour.eksponat;
    for(let item of set.values()){
      if(item.id == showpieceID)
        this.data.tour.eksponat.delete(item);
    }
  }

  goToPage(id: string) {
    this.close();
    let url = "/catalogue/exhibits/showpiece/" + id;
    this.router.navigateByUrl(url);
  }

}