import { BaseModel } from "./BaseModel";
import { ContactModel } from "./ContactModel";
import { TourModel } from "./TourModel";
import { ExhibitModel as string } from "./ExhibitModel";

export interface UserModel extends BaseModel{
    ime: string;
    prezime: string;
    username: string;
    password: string;
    kontaktPodaci: ContactModel;
    omiljenePostavke: string[];
    planer: TourModel[]; // svaki korisnik ima svoj planer u okviru kojeg vrsi CRUD akcije nad obilascima
}