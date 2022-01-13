import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserModel } from '../models/userModel';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser$: BehaviorSubject<UserModel | null> =
    new BehaviorSubject<UserModel | null>(null);

  constructor(private localStorageService: LocalStorageService) {}

  logIn(user: UserModel) {
    this.loggedInUser$.next(user);

    const korisnik = this.loggedInUser$.getValue();
    if (korisnik) {
      this.localStorageService.setLocalStorageItem(
        'username',
        korisnik.username
      );
      this.localStorageService.setLocalStorageItem('id', '' + korisnik.id);
    }
  }

  getCurrentUser() {
    return this.loggedInUser$;
  }

  logOut() {
    this.loggedInUser$.next(null);
    this.localStorageService.clearLocalStorage();
  }
}
