import { Injectable } from '@angular/core';
import { ExhibitModel } from '../models/ExhibitModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/Postavke.json';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExhibitsService extends GenericCRUD<ExhibitModel> {
  
  fajl: string = "Postavke.json";

  constructor(
    private readingJSON: ReadingJSONService,
    private router: Router
  ){
    super(readingJSON);

    this.readFromFile();
  }

  public readFromFile(): void {
    this.items = dataFile;
  }

  public viewExhibitionShowpieces(id: string) {
    let url = "/catalogue/exhibits/" + id;
    this.router.navigateByUrl(url);
  }

  // public readFromFile(): void{
  //   this.readingJSON.getJSON(this.fajl).subscribe(
  //     result => this.items = result
  //   );
  // }
}
