import { BaseModel } from "./BaseModel";
import { UserModel } from "./UserModel";

export interface ReviewModel extends BaseModel{
    user: UserModel;
    comment: string;
    rating: number;
}