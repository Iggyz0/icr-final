import { BaseModel } from './BaseModel';
import { ReviewModel } from './ReviewModel';
import { ShowPieceModel } from './ShowpieceModel';

export interface ExhibitModel extends BaseModel {
  vrstaPostavke: string;
  eksponati: ShowPieceModel[]; 
  brojEksponata?: number; 
  cena: number; 
  procenjenoVremeObilaska: number; 
  recenzijePostavke: ReviewModel[];//Kako cemo recenzirati postavke?
  prosecnaOcena: number; 
  createdBy: string;
}
