import { Injectable } from '@angular/core';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/Eksponati.json';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShowpieceService extends GenericCRUD<ShowPieceModel>{
  fajl: string = "Eksponati.json";

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

  viewDetails(id: string) {
    let url = "/catalogue/exhibits/showpiece/" + id;
    this.router.navigateByUrl(url);
  }

  // public readFromFile(): void{
  //   this.readingJSON.getJSON(this.fajl).subscribe(
  //     result => this.items = result
  //   );
  // }
}
