import { AddressModel } from "./addressModel";

export class UserModel {
    id?: string = '';
    firstName?: string = '';
    lastName?: string = '';
    email?: string = '';
    phone?: string = '';
    address? = new AddressModel();
    favourites?: string[] = []; //NOTE: niz kategorija koje su omiljene korisniku
    username: string = '';
    password: string = '';
    dateCreated?: Date;
}
