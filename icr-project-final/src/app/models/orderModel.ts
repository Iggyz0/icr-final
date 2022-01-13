import { OrderItemModel } from "./orderItemModel";
import { UserModel } from "./userModel";

export class OrderModel{
  id?: string;
  items: OrderItemModel[];
  user: UserModel;
  totalPrice: number;
  dateCreated?: Date;
  status?: string;
  paymentOption: string;
  minEta?: number;
}
