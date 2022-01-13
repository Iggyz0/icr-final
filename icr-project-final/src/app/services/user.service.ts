import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/userModel';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }

  user: UserModel;
  userName = new BehaviorSubject<string>("");

  getCurrentUser(): UserModel {
    return this.user;
  }

  setCurrentUser(user: UserModel) {
    this.user = user;
    this.setCurrentUsername();
  }

  getCurrentUsername(){
    return this.userName;
  }

  setCurrentUsername(){
    this.userName.next( this.getCurrentUser().username );
  }

  getUserByUsernameFromTheServer(username: string): Observable<UserModel> {

    const url = "http://localhost:8080/users/finduserbyusername/" + username;

    return this.http.get<UserModel>(url, { observe: 'body' });
  }

  updateUser(usermodel: UserModel):Observable<UserModel>{
    const url = "http://localhost:8080/users/updateuser";

    return this.http.put<UserModel>(url, usermodel, {observe: 'body'});
  }

}
