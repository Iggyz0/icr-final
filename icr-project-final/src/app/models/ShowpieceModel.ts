import { BaseModel } from "./BaseModel";
import { ReviewModel } from "./ReviewModel";

export interface ShowPieceModel extends BaseModel{
    naziv: string;
    opis: string;
    slika: string; //HELP: valjda?
    vrsta: string;
    cena: number; 
    vremeObilaska: number;
    zemljaPorekla: string;
    recenzije: ReviewModel[];
    ukupnaOcena: number;
}