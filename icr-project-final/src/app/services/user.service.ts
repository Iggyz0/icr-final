import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/users.json';
import { TourModel } from '../models/TourModel';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { ExhibitModel } from '../models/ExhibitModel';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericCRUD<UserModel> {
  fajl: string = 'users.json';
  planerID = 1;

  constructor(readingJSON: ReadingJSONService) {
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

  public findUserByUsername(username: string): UserModel | undefined {
    return this.items.find((user) => user.username === username);
  }

  public insertUser(user: UserModel) {
    if (!this.findUserByUsername(user.username)) {
      user.id = -1; //setujemo na ovo preventivno zbog genericke metode
      return this.insertItem(user);
    }
    return false;
  }

  public createBlankTour(userID: number) {
    let user = this.findItemByID(userID);

    user.planer.push({
      id: this.planerID++,
      eksponat: new Set<ShowPieceModel>(),
      ocena: 0,
      status: 'tekuci',
      ukupnaCena: 0,
      ukupnoVreme: 0,
      dateCreated: new Date(),
    });

    if (this.updateItem(user)) {
      return user.planer[user.planer.length];
    }
    return false;
  }

  public fetchUserTours(userID: number): TourModel[] {
    return this.findItemByID(userID).planer;
  }

  public deleteUserTour(userID: number, tourID: number): boolean {
    let user = this.findItemByID(userID);
    if (user !== undefined) {
      let planer = user.planer.filter((tour) => tour.id !== tourID);
      user.planer = planer;

      if (this.updateItem(user) !== undefined) {
        return true;
      }
    }

    return false;
  }

  public updateUserTour(userID: number, tour: TourModel) {
    let user = this.findItemByID(userID);

    let newTours = user.planer.filter((tourX) => tourX.id !== tour.id);
    newTours.push(tour);
    newTours = newTours.sort((tour1, tour2) => tour1.id - tour2.id);

    user.planer = newTours;
    if (this.updateItem(user)) {
      return user;
    }

    return false;
  }

  public addShowPieceToTour(
    userID: number,
    showpiece: ShowPieceModel,
    tourID: number
  ): TourModel {
    let user = this.findItemByID(userID);

    let tour = user.planer.find((obilazak) => obilazak.id == tourID);
    tour.eksponat.add(showpiece);
    
    const objekat = this.sracunajUkupnuCenuIUkupnoVreme(tour.eksponat);
    tour.ukupnaCena = objekat.ukupnaCena;
    tour.ukupnoVreme = objekat.ukupnoVreme;

    user.planer = user.planer.filter((obilazak) => obilazak.id != tourID);
    user.planer.push(tour);
    user.planer = user.planer.sort((tour1, tour2) => tour1.id - tour2.id);

    if (this.updateItem(user)) {
      return tour;
    }

    return null;
  }

  sracunajUkupnuCenuIUkupnoVreme(eksponati: Set<ShowPieceModel> | ShowPieceModel[]){
    let ukupnaCena = 0;
    let ukupnoVreme = 0;

    for(let eksponat of Array.from(eksponati)){
      ukupnaCena+=eksponat.cena;
      ukupnoVreme+=eksponat.vremeObilaska;
    }

    return {
      "ukupnaCena": ukupnaCena,
      "ukupnoVreme" : ukupnoVreme
    };
  }

  public removeShowpieceFromTour(
    userID: number,
    showpiece: ShowPieceModel,
    tourID: number
  ) {
    let user = this.findItemByID(userID);

    let tour = user.planer.find((obilazak) => obilazak.id === tourID);
    tour.eksponat.delete(showpiece);

    const objekat = this.sracunajUkupnuCenuIUkupnoVreme(tour.eksponat);
    tour.ukupnaCena = objekat.ukupnaCena;
    tour.ukupnoVreme = objekat.ukupnoVreme;

    user.planer = user.planer.filter((obilazak) => obilazak.id !== tourID);
    user.planer.push(tour);
    user.planer = user.planer.sort((tour1, tour2) => tour1.id - tour2.id);

    if (this.updateItem(user)) {
      return user;
    }

    return null;
  }

  public findTour(userID: number, tourID: number): TourModel {
    return this.findItemByID(userID).planer.find(
      (obilazak) => obilazak.id === tourID
    );
  }

  public doesTourContainExhibit(
    userID: number,
    showpiece: ShowPieceModel
  ): boolean {
    let user = this.findItemByID(userID);

    let doesContain = false;
    user.planer.forEach((tour) => {
      if (tour.status == 'zavrsen') {
        for (let item of tour.eksponat.values()) {
          if (item.id == showpiece.id) {
            doesContain = true;
          }
        }
      }
    });
    
    return doesContain;
  }

  public hasAlreadyReviewed(userID: number, showpiece: ShowPieceModel): boolean {
    let hasAlreadyReviewed = false
    showpiece.recenzije.forEach(review => {
      if(review.user.id == userID ) {
        hasAlreadyReviewed = true;
        return;
      }
    });
    return hasAlreadyReviewed;
  }

  public addExhibitToTour(
    userID: number,
    exhibit: ExhibitModel,
    tourID: number
  ) {
    let user = this.findItemByID(userID);
    let newTour: TourModel = user.planer.find(
      (obilazak) => obilazak.id == tourID
    );

    exhibit.eksponati.forEach((exponat) => {
      newTour.eksponat.add(exponat);
    });

    const objekat = this.sracunajUkupnuCenuIUkupnoVreme(newTour.eksponat);
    newTour.ukupnaCena = objekat.ukupnaCena; 
    newTour.ukupnoVreme = objekat.ukupnoVreme; 

    user.planer = user.planer.filter((obilazak) => obilazak.id != tourID);
    user.planer.push(newTour);
    user.planer = user.planer.sort((tour1, tour2) => tour1.id - tour2.id);

    if (this.updateItem(user)) {
      return user;
    }

    return null;
  }

  public removeExhibitFromTour(
    userID: number,
    exhibit: ExhibitModel,
    tourID: number
  ) {
    let user = this.findItemByID(userID);

    let newTour = user.planer.find((obilazak) => obilazak.id === tourID);

    exhibit.eksponati.forEach((exponat) => {
      newTour.eksponat.delete(exponat);
    });

    const objekat = this.sracunajUkupnuCenuIUkupnoVreme(exhibit.eksponati);
    newTour.ukupnaCena = objekat.ukupnaCena; 
    newTour.ukupnoVreme = objekat.ukupnoVreme;

    user.planer = user.planer.filter((obilazak) => obilazak.id !== tourID);
    user.planer.push(newTour);
    user.planer = user.planer.sort((tour1, tour2) => tour1.id - tour2.id);

    if (this.updateItem(user)) {
      return user;
    }

    return null;
  }
  1;
}
