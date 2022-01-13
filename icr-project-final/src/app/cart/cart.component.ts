import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderItemModel } from '../models/orderItemModel';
import { OrderModel } from '../models/orderModel';
import { ProductModel } from '../models/productModel';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {

  displayedCartColumns = [
    'nummero','imagePath', 'name', 'category', 'subCategory', 'manufacturer', 
    'address.city', 'score', 'price', 'leftInStock', 'quantity', 'remove'
  ]
  cartSource = new MatTableDataSource<any>();

  // items = [];
  paymentMethods = ["VISA", "Master Card", "PayPal", "Crypto"];
  paymentValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cartService: CartService, private orderService: OrderService, private matSnackBar: MatSnackBar, private userService: UserService) {
  }

  ngOnInit(): void {

    this.cartSource.data = this.cartService.getAllFromCart() ;
  }

  ngAfterViewInit(): void {
    this.cartSource.paginator = this.paginator;
    this.cartSource.sort = this.sort;
  }

  buy() {
    this.cartSource.data = this.cartService.getAllFromCart();

    // let orderTemp = this.cartService.getAllFromCart();

    if (this.cartSource.data.length < 1) {
      this.matSnackBar.open("No items in your cart!", "", { duration: 2500 });
      return;
    }
    if (this.paymentValue == '' || this.paymentValue.length < 1) {
      this.matSnackBar.open("Please select a payment method", "", { duration: 2500 });
      return;
    }

    let orderItemModel: OrderItemModel[] = [];

    this.cartSource.data.forEach((orderItem) => {
      let itemModel: OrderItemModel = {
      "product" : {
        "id": orderItem.id,
        "slug": orderItem.slug,
        "name": orderItem.name,
        "description": orderItem.description,
        "leftInStock": orderItem.leftInStock,
        "price": orderItem.price,
        "manufacturer": orderItem.manufacturer,
        "score": orderItem.score,
        "imagePath": orderItem.imagePath,
        "modelPath": orderItem.modelPath,
        "address": orderItem.address,
        "category": orderItem.category,
        "subCategory": orderItem.subCategory
      },
      "quantity": orderItem.quantity
      };
      orderItemModel.push(itemModel);
    });

    let orderModel: OrderModel = {
      items: orderItemModel,
      user: this.userService.getCurrentUser(),
      totalPrice: this.cartService.totalCartValue(),
      paymentOption: this.paymentValue
    }

    if (orderModel != null) {
      this.orderService.createOrder(orderModel).subscribe((result) => {
        if (result != null) {
          this.cartService.clearCart();
          this.cartSource.data = this.cartService.getAllFromCart();
          this.matSnackBar.open("Order created!", "", { duration: 2500 });
        } else {
          this.matSnackBar.open("Could not create order...", "", { duration: 2500 });
        }
      });
    }
  }

  getCurrentProductQuantityFromCart(product: ProductModel) {
    return this.cartService.getProductFromCart(product).quantity;
  }

  increaseProductQuantity(value: any, product: ProductModel) {
    value = "" + (+value+1);

    if (value <= product.leftInStock) {
      this.cartService.updateQuantity(product, value);
    }

  }

  decreaseProductQuantity(value: any, product: ProductModel) {
    // console.log(value);
    value = "" + (+value-1);

    if (value > 0) {
      this.cartService.updateQuantity(product, value);
    }

  }

  removeFromCart(product: ProductModel) {
    this.cartService.removeFromCart(product);
    this.cartSource.data = this.cartService.getAllFromCart();
  }

  calculateTotal(){
    return this.cartService.totalCartValue();
  }

  getCartSize() {
    return this.cartService.getCartSize();
  }

}
