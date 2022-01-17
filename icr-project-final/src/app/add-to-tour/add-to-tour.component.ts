import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { TourModel } from '../models/TourModel';
import { UserModel } from '../models/userModel';
import { LocalStorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-to-tour',
  templateUrl: './add-to-tour.component.html',
  styleUrls: ['./add-to-tour.component.css']
})
export class AddToTourComponent implements OnInit {
  selected: number;

  user: UserModel;
  planer: TourModel[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShowPieceModel, 
    private dialogRef: MatDialogRef<AddToTourComponent>,
    private localStorage: LocalStorageService,
    private userService: UserService,
    private matSnackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    const id = this.localStorage.getLocalStorageItem('id');
    this.user = this.userService.findItemByID(+id);
    this.planer = this.user.planer.filter( tour => tour.status == 'tekuci')
  }

  submit() {
    const id = this.localStorage.getLocalStorageItem('id');

    let user;
    if (
      user = this.userService.addShowPieceToTour(+id, this.data, this.selected) !== null
    ) {
      this.dialogRef.close(user);
    } else {
      this.matSnackBar.open('There was an error', '', { duration: 2500 });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
