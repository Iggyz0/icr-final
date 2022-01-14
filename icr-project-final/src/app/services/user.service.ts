import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/users.json';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericCRUD<UserModel> {

  fajl: string = "users.json";

  constructor(
    private readingJSON: ReadingJSONService
  ){
    super(readingJSON);

    this.readFromFile();
  }

  public readFromFile(): void {
    this.items = dataFile;
  }

  // public readFromFile(): void{
  //   this.readingJSON.getJSON(this.fajl).subscribe(
  //     result => this.items = result
  //   );
  // }

  public findUserByUsername( username: string) : UserModel | undefined{
    return this.items.find( (user) => user.username === username);
  }

  public insertUser( user: UserModel ){
    if( !this.findUserByUsername( user.username )){
      user.id = -1;//setujemo na ovo preventivno zbog genericke metode
      return this.insertItem(user);
    }
    return false;
  }
}
