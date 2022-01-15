import { BaseModel } from "./BaseModel";
import { ShowPieceModel } from "./ShowpieceModel";

export interface TourModel extends BaseModel{
    // nazivEksponata: string;
    // opisEksponata: string;
    //ili samo da stavimo ovako, umesto opisa i naziva (?)
    eksponat: Set<ShowPieceModel>;
    ukupnoVreme: number;//automatski se racuna na osnovu eksponata ukljucenih u obilazak
    ukupnaCena: number; //automatski se racuna na osnovu eksponata
    status: string;//('završen',  'tekući',  'otkazan')
    ocena: number; //Samo za zavrsene obilaske
    dateCreated: Date;
}