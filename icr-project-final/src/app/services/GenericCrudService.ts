import { BaseModel } from '../models/BaseModel';
import { ReadingJSONService } from './reading-json.service';


export abstract class GenericCRUD<T extends BaseModel> {
  items: T[] = [];
  unique_ID: number = 1;

  constructor(
    private readJSON: ReadingJSONService
  ){}

  public getAllItems(): T[] {
    return this.items;
  }

  public insertItem(item: T): boolean {
    if (this.findItemByID(item.id)) {
      //ako nadje predmet, vec postoji u bazi
      return false; //vracamo da nije upisan
    }
    item.id = (this.findMaxID())+1;
    this.items.push(item);
    return true; //u suprotnom jeste
  }

  private findMaxID() : number{
    let max  = -1;
    this.items.forEach(
      element => {
      
        if(element.id > max)
          max = element.id;

    });
    return max;
  }

  public deleteItemByID(id: number): boolean {
    let isSuccessfullyDeleted: boolean = false;
    this.items = this.items.filter((item) => {
      if (item.id === id) {
        isSuccessfullyDeleted = true;
        return false;
      }
      return true;
    });

    return isSuccessfullyDeleted; //if successful - true, otherwise false
  }

  public updateItem(noviPredmet: T): T | undefined {
    let old_item = this.findItemByID(noviPredmet.id);

    if (old_item !== undefined && this.deleteItemByID(old_item.id)) {
      noviPredmet.id = old_item.id;
      this.insertItemWithoutID(noviPredmet);
      return noviPredmet;
    }

    return undefined;
  }

  private insertItemWithoutID(item: T) {
    this.items.push(item);
  }

  public findItemByID(id: number): T | undefined {
    //ako nadje predmet vratice T, u suprotnom undefined
    return this.items.find((item) => item.id === id);
  }

  public toJSON() {
    return JSON.parse(JSON.stringify(this.items));
  }

  public abstract readFromFile(): void;

}
