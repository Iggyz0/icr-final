import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/userModel';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalstorageService, private http: HttpClient) { }

  isLoggedIn = new BehaviorSubject<boolean>(false);

  loginUser(user: UserModel): Observable<UserModel> {
    const url = "http://localhost:8080/auth/login";

    return this.http.post<UserModel>(url, user, { observe: 'body' });
  }

  registerUser(user: UserModel): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/auth/register";

    return this.http.post<any>(url, user);
  }

  isUserLoggedIn(): BehaviorSubject<boolean> {
    if (this.localStorageService.getLocalStorageItem("username") != null && this.localStorageService.getLocalStorageItem("username").length > 0) {
      this.logTheUserIn();
    }
    return this.isLoggedIn;
  }

  logTheUserIn() {
    this.isLoggedIn.next(true);
  }

  logTheUserOut() {
    this.isLoggedIn.next(false);
  }

  logout() {
    this.localStorageService.removeLocalStorageItem("username");
    this.logTheUserOut();
  }
}
