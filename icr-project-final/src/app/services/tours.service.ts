import { Injectable } from '@angular/core';
import { TourModel } from '../models/TourModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/Obilazak.json';

@Injectable({
  providedIn: 'root',
})
export class ToursService extends GenericCRUD<TourModel> {
  fajl: string = 'Obilazak.json';

  constructor(private readingJSON: ReadingJSONService) {
    super(readingJSON);

    this.readFromFile();
  }

  public readFromFile(): void {
    this.items = dataFile;
  }

  // public readFromFile(): void {
  //   this.readingJSON
  //     .getJSON(this.fajl)
  //     .subscribe((result) => (this.items = result));
  // }
}
