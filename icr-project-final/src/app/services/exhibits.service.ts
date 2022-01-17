import { Injectable } from '@angular/core';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/Postavke.json';
import { Router } from '@angular/router';
import { ExhibitCreationComponent } from '../planer/exhibit-creation/exhibit-creation.component';
import { LocalStorageService } from './localstorage.service';
import { MatDialog } from '@angular/material/dialog';
import { ExhibitModel } from '../models/ExhibitModel';
import { TourModel } from '../models/TourModel';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { ToursService } from './tours.service';

@Injectable({
  providedIn: 'root',
})
export class ExhibitsService extends GenericCRUD<ExhibitModel> {
  fajl: string = 'Postavke.json';
  dialogOpen = false;
  constructor(
    private readingJSON: ReadingJSONService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private tourService: ToursService
  ) {
    super(readingJSON);

    this.readFromFile();
  }

  public readFromFile(): void {
    this.items = dataFile;
  }

  public viewExhibitionShowpieces(id: string) {
    let url = '/catalogue/exhibits/' + id;
    this.router.navigateByUrl(url);
  }

  public createExhibitDialog(tour: TourModel) {
    this.dialogOpen = true;

    const exhibitCreationDialog = this.dialog.open(ExhibitCreationComponent, {
      disableClose: true,
      width: '70vw',
      panelClass: 'dialog-responsive',
      data: tour,
    });

    exhibitCreationDialog.afterOpened().subscribe(() => {
      if (this.localStorageService.getLocalStorageItem('theme') == 'dark') {
        exhibitCreationDialog.addPanelClass('darkMode');
      }
    });

    exhibitCreationDialog.afterClosed().subscribe((result) => {
      this.dialogOpen = false;
      if (result != false) {
        tour.createdAsExhibit = true;
        this.tourService.updateItem(tour);
      }
    });
  }

  updateExhibitShowpieces(showpieces: ShowPieceModel[]) {
    for (let i = 0; i < this.items.length; i++) {
      let postavka: ExhibitModel = this.items[i];

      for (let j = 0; j < postavka.eksponati.length; j++) {
        let eksponatPostavke: ShowPieceModel = postavka.eksponati[j];

        for (let z = 0; z < showpieces.length; z++) {
          if (showpieces[z].id == eksponatPostavke.id) {
            this.items[i].eksponati[j] = showpieces[z];
          }
        }
      }
    }
  }

  // public readFromFile(): void{
  //   this.readingJSON.getJSON(this.fajl).subscribe(
  //     result => this.items = result
  //   );
  // }
}
