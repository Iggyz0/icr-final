import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm , NgModel, FormsModule} from '@angular/forms';
import { UserModel } from '../models/userModel';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../services/localstorage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  @Input() userData!: UserModel;
  @Output() userDataChange = new EventEmitter<UserModel>(); 

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  update(forma: NgForm) {
    let stari_korisnik = this.userData;

    stari_korisnik.ime = forma.value.ime;
    stari_korisnik.prezime = forma.value.prezime;
    stari_korisnik.password = forma.value.password;
    stari_korisnik.kontaktPodaci.email = forma.value.email;
    stari_korisnik.kontaktPodaci.telefon = forma.value.telefon;
    stari_korisnik.kontaktPodaci.adresa = forma.value.adresa;

    if (this.userService.updateItem(stari_korisnik) !== undefined) {
      this.snackBar.open('Updated successfully!', '', { duration: 2500 });
      this.localStorage.clearLocalStorage();
      this.authService.logIn(stari_korisnik);

      this.updateParentData(stari_korisnik);
    } else {
      this.snackBar.open("There's been an error during an update", '', {
        duration: 2500,
      });
    }
  }

  updateParentData( value: UserModel){
    this.userDataChange.emit(value);
  }

}
