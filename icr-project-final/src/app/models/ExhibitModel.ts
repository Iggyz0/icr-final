import { BaseModel } from './BaseModel';
import { ReviewModel } from './ReviewModel';
import { ShowPieceModel } from './ShowpieceModel';

export interface ExhibitModel extends BaseModel {
  vrstaPostavke: string;
  // vrstaEksponata: string; //same eksponate da ukljucimo?
  eksponati: ShowPieceModel[]; // <- ?
  brojEksponata?: number; // ovo se racuna automatski (?)
  cena: number; //not sure?
  procenjenoVremeObilaska: number; //racuna se automatski (?) (na osnovu eksponata koji su deo postavke)
  recenzijePostavke: ReviewModel[];
  prosecnaOcena: number; //racuna  se automatski na osnovu recenzija(?)
}
