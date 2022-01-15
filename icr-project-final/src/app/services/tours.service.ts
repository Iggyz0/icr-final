import { Injectable } from '@angular/core';
import { TourModel } from '../models/TourModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/Obilazak.json';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from './localstorage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToTourComponent } from '../add-to-tour/add-to-tour.component';

@Injectable({
  providedIn: 'root',
})
export class ToursService extends GenericCRUD<TourModel> {
  fajl: string = 'Obilazak.json';
  dialogOpen: boolean = false;

  constructor
  (
    private readingJSON: ReadingJSONService,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,

  ) 
  {
    super(readingJSON);
    this.readFromFile();
  }

  public readFromFile(): void {
    this.items = dataFile;
  }

  public addToTour(showpiece: ShowPieceModel) {
    if (this.authService.getCurrentUser().getValue() == null) {
      this.snackBar.open("You have to login in order to add to a tour.", "OK", {duration: 2500});
      return;
    }

    this.dialogOpen = true;

    const productDetailsDialog = this.dialog.open(AddToTourComponent, {
      disableClose: true,
      width: '70vw',
      panelClass: "dialog-responsive",
      data: showpiece
    });

    productDetailsDialog.afterOpened().subscribe(() => {
      if(this.localStorageService.getLocalStorageItem("theme") == "dark") {
          productDetailsDialog.addPanelClass('darkMode');
      }
    });

    productDetailsDialog
    .afterClosed()
    .subscribe(
      result => { this.dialogOpen=false;
      }
    );
  }
}
