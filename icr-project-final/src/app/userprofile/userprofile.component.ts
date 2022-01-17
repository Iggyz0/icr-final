import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm, NgModel, FormsModule, FormControl } from '@angular/forms';
import { UserModel } from '../models/userModel';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../services/localstorage.service';
import { AuthService } from '../services/auth.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExhibitsService } from '../services/exhibits.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  @Input() userData!: UserModel;
  @Output() userDataChange = new EventEmitter<UserModel>();

  //mat-chips necessities
  postavkaControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('postavkaInput') postavkaInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  svePostavke: string[] = [];
  filtriranePostavke: Observable<string[]>;

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private exhibitService: ExhibitsService
  ) {
    this.filtriranePostavke = this.postavkaControl.valueChanges.pipe(
      startWith(null),
      map((postavka: string | null) =>
        postavka ? this._filter(postavka) : this.svePostavke.slice()));

  }

  ngOnInit(): void {
    this.svePostavke = this.returnUniqueExhibits();
  }

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

  updateParentData(value: UserModel) {
    this.userDataChange.emit(value);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our postavka
    if ((value || '').trim()) {
      this.userData.omiljenePostavke.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.postavkaControl.setValue(null);
  }
  remove(omiljenaPostavka) {
    const index = this.userData.omiljenePostavke.indexOf(omiljenaPostavka);

    if (index >= 0) {
      this.userData.omiljenePostavke.splice(index, 1);
    }
  }

   selected(event: MatAutocompleteSelectedEvent): void {
    this.userData.omiljenePostavke.push(event.option.viewValue);
    this.postavkaInput.nativeElement.value = '';
    this.postavkaControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.svePostavke.filter((category) => {
      return category.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  returnUniqueExhibits() : string[]{
    return Array.from(this.exhibitService.getAllItems().reduce( (prev, current) => {
      return prev.add(current.vrstaPostavke)
    }, new Set<string>()));
  }

}

