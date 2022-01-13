import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/orderModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(orderModel: OrderModel): Observable<OrderModel> {
    const url = "http://localhost:8080/orders/createorder";

    return this.http.post<OrderModel>(url, orderModel, { observe: 'body' });
  }

  fetchAllUserOrders(): Observable<OrderModel[]> {
    const url = "http://localhost:8080/orders/getalluserorders/" + localStorage.getItem("username");

    return this.http.get<OrderModel[]>(url, { observe: 'body' });
  }

  updateOrder(orderModel: any){
    const url = "http://localhost:8080/orders/updateorder";
    return this.http.put<OrderModel>(url, orderModel ,{ observe: 'body' });

  }

  updateOrderItems(orderModel: any): Observable<OrderModel> {
    const url = "http://localhost:8080/orders/updateorderitems";

    return this.http.put<OrderModel>(url, orderModel, {observe: 'body'});
  }

  deleteOrder(order_id): Observable<HttpResponse<any>>{
    const url = "http://localhost:8080/orders/deleteorder?order_id="+order_id;

    return this.http.delete(url, {observe: 'response'});
  }

}
