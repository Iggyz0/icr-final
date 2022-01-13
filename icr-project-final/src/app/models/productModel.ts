import { AddressModel } from "./addressModel";

export class ProductModel {
    id: string;
    slug: string = '';
    name: string = '';
    description: string = '';
    leftInStock: number;
    price: DoubleRange;
    manufacturer: string = '';
    score: DoubleRange; // prosek svih ocena za zadati proizvod; ukloniti ako zasmeta
    imagePath: string = '';
    modelPath: string = '';
    address: AddressModel; //NOTE: neophodno, za generisanje distance koristiti random vrednosti
    category: string = '';
    subCategory: string = '';
}