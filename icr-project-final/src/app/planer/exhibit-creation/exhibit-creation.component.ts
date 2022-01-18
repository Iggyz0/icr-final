import { ArrayDataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExhibitModel } from 'src/app/models/ExhibitModel';
import { TourModel } from 'src/app/models/TourModel';
import { ExhibitsService } from 'src/app/services/exhibits.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-exhibit-creation',
  templateUrl: './exhibit-creation.component.html',
  styleUrls: ['./exhibit-creation.component.css']
})
export class ExhibitCreationComponent implements OnInit {

  allTypes: string[] = [];
  typeValue: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TourModel,
    private matDialogRef: MatDialogRef<ExhibitCreationComponent>,
    private exhibitsService:ExhibitsService,
    private localStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.findUniqueTypesOfExhibitions();
  }

  close(){
    this.matDialogRef.close(false);
  }

  onSubmit( form : NgForm){

    let cenaCalc = Array.from(this.data.eksponat).reduce( (prev, curr) => prev+=curr.cena , 0)
    let procenjenoVremeObilaskaCalc = Array.from(this.data.eksponat).reduce( (prev,curr) => prev+=curr.vremeObilaska, 0);
    let prosecnaOcenCalc = this.calculateProsecnaOcena();
    
    let ExhibitModel: ExhibitModel = {
      ime: form.value.ime,
      cena: cenaCalc,
      createdBy: this.localStorage.getLocalStorageItem('username'),
      id: -1,
      procenjenoVremeObilaska: procenjenoVremeObilaskaCalc,
      eksponati: Array.from(this.data.eksponat), 
      prosecnaOcena:  prosecnaOcenCalc,
      vrstaPostavke: form.value.vrsta,
      recenzijePostavke: [],
      brojEksponata: this.data.eksponat.size
    };

    this.exhibitsService.insertItem(ExhibitModel);
    this.matDialogRef.close(ExhibitModel);
  }

  calculateProsecnaOcena() : number{
    let sum = 0;
    for(let showpiece of this.data.eksponat.values()){
      for(let review of showpiece.recenzije){
        sum+=review.rating;
      }
    }
    sum=sum/this.data.eksponat.size;
    return sum;
  }

  findUniqueTypesOfExhibitions() {
    this.allTypes = [...new Set(this.getAllExhibits().map((item) => item.vrstaPostavke))];
  }

  getAllExhibits(): ExhibitModel[] {
    return this.exhibitsService.getAllItems();
  }

}
