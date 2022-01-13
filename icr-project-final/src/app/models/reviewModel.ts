import { ProductModel } from "./productModel";
import { UserModel } from "./userModel";


export class ReviewModel{
  id?: string = "";
  product: ProductModel = null;
  user: UserModel = null;
  score: number = 0;
  comment: string = "";
  dateCreated?: Date;
}
