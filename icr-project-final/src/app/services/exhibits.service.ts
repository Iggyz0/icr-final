import { Injectable } from '@angular/core';
import { ExhibitModel } from '../models/ExhibitModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';

@Injectable({
  providedIn: 'root'
})
export class ExhibitsService extends GenericCRUD<ExhibitModel> {
  fajl: string = "Postavke.json";

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
