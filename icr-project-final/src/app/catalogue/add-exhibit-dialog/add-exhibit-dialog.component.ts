import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExhibitModel } from 'src/app/models/ExhibitModel';
import { TourModel } from 'src/app/models/TourModel';
import { UserModel } from 'src/app/models/userModel';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-exhibit-dialog',
  templateUrl: './add-exhibit-dialog.component.html',
  styleUrls: ['./add-exhibit-dialog.component.css'],
})
export class AddExhibitDialogComponent implements OnInit {
  selected: number;

  user: UserModel;
  planer: TourModel[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ExhibitModel,
    private userService: UserService,
    private localStorage: LocalStorageService,
    private matSnackBar: MatSnackBar,
    private ref: MatDialogRef<AddExhibitDialogComponent>
  ) {}

  ngOnInit(): void {
    const id = this.localStorage.getLocalStorageItem('id');
    this.user = this.userService.findItemByID(+id);
    this.planer = this.user.planer.filter( tour => tour.status == 'tekuci')
  }

  submit() {
    const id = this.localStorage.getLocalStorageItem('id');

    let user;
    if (
      user = this.userService.addExhibitToTour(+id, this.data, this.selected) != null
    ) {
      this.ref.close(user);
    } else {
      this.matSnackBar.open('There was an error', '', { duration: 2500 });
    }
  }

  cancel(){
    this.ref.close();
  }

}
