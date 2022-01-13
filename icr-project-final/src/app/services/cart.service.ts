import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { list, update, total, get, add, exists, remove, destroy } from 'cart-localstorage';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { OrderItemModel } from '../models/orderItemModel';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSize = new BehaviorSubject<number>(0);

  constructor(private snackBar: MatSnackBar) { }

  clearCart(){
    destroy();
    this.setCartSize();
  }

  addItemToCart(product: ProductModel) {
    add(product, 1);
    this.setCartSize();
    this.snackBar.open("Product added to cart!", "", { duration: 2500 });
  }

  removeFromCart(product: ProductModel) {
    remove(product.id);
    this.setCartSize();
    this.snackBar.open("Product removed from cart!", "", { duration: 2500 });
  }

  getAllFromCart() {
    return list();
  }

  // getAllFromCartWithSub(): Observable<any> {
  //   return list();
  // }

  getProductFromCart(product: ProductModel) {
    return get(product.id);
  }

  getProductFromCartById(id: string) {
    return get(id);
  }

  alreadyInCart(product: ProductModel) {
    return exists(product.id);
  }

  updateQuantity(product: ProductModel, newQuantity: string) {
    update(product.id, "quantity", newQuantity);
  }

  totalCartValue() {
    return total();
  }

  setCartSize(){
    return this.cartSize.next( this.getCartSize() );
  }

  getCartSize():number{
    return this.getAllFromCart().length;
  }

  geter(){
    this.setCartSize();
    return this.cartSize;
  }

}
