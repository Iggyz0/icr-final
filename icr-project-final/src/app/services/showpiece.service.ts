import { Injectable } from '@angular/core';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';

@Injectable({
  providedIn: 'root'
})
export class ShowpieceService extends GenericCRUD<ShowPieceModel>{
  fajl: string = "Eksponati.json";

  constructor(
    private readingJSON: ReadingJSONService
  ){
    super(readingJSON);

    this.readFromFile();
  }

  public readFromFile(): void{
    this.readingJSON.getJSON(this.fajl).subscribe(
      result => this.items = result
    );
  }
}
