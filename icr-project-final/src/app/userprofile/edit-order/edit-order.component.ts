import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderItemModel } from 'src/app/models/orderItemModel';
import { OrderModel } from 'src/app/models/orderModel';
import { ProductModel } from 'src/app/models/productModel';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit, AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderModel,
  private orderService: OrderService,
  private dialogRef: MatDialogRef<EditOrderComponent>) { }

  displayedCartColumns = [
    'nummero','imagePath', 'name', 'category', 'subCategory', 'manufacturer', 
    'address.city', 'score', 'price', 'leftInStock', 'quantity', 'remove'
  ]
  cartSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.cartSource.data = this.data.items;
    console.log(this.cartSource.data);
  }

  ngAfterViewInit(): void {
    this.cartSource.paginator = this.paginator;
    this.cartSource.sort = this.sort;
  }


  updateOrderItems(){
    this
    .orderService
    .updateOrderItems({
      'id': this.data.id,
      'items': this.cartSource.data
    })
    .subscribe(
      response => {
        if(response != null){
          this.dialogRef.close(response);
        }
      }
    );
  }

  removeFromCart(orderItemModel: OrderItemModel) {

    let index = this.cartSource.data.indexOf(orderItemModel);

    this.cartSource.data.splice(index, 1);

    this.cartSource._updateChangeSubscription();

    this.data.items = this.cartSource.data;
    
  }

  calculateTotal(){
    return this.cartSource.data.reduce((total, currentValue) => {
      total += (currentValue.quantity * currentValue.product.price);
    }, 0);
  }

  getCartSize() {
    return this.cartSource.data.length;
  }


}
