import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ProductModel[]> {
    const url = "http://localhost:8080/products/findallproducts";

    return this.http.get<ProductModel[]>(url, { observe: 'body' });
  }

  findAllCategories(): Observable<string[]> {
    const url = "http://localhost:8080/products/findallcategories";

    return this.http.get<string[]>(url, { observe: 'body' });
  }

}
