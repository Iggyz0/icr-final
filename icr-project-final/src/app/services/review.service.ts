import { Injectable } from '@angular/core';
import { ReviewModel } from '../models/ReviewModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends GenericCRUD<ReviewModel> {
  fajl: string = "Review.json";

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
