import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TourModel } from '../models/TourModel';
import { MatPaginator } from "@angular/material/paginator";
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/localstorage.service';
import { MatTab } from '@angular/material/tabs';
import { MatSort } from '@angular/material/sort';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ToursService } from '../services/tours.service';
import { ExhibitsService } from '../services/exhibits.service';
import { ExhibitModel } from '../models/ExhibitModel';
import { MatDialog } from '@angular/material/dialog';
import { StartTourComponent } from '../start-tour/start-tour.component';

@Component({
  selector: 'app-planer',
  templateUrl: './planer.component.html',
  styleUrls: ['./planer.component.css']
})
export class PlanerComponent implements OnInit {

  @Input() tours!: TourModel[] ;
  @Output() toursUpdate = new EventEmitter<TourModel[]>();
  @Input() userID!: number;

  toursDataSource = new MatTableDataSource<TourModel>();
  displayedColumnsOrders = [
    'No.',
    'id',
    "dateCreated",
    'ukupnoVreme',
    'ukupnaCena',
    'status',
    'ocena',
    'viewItems',
    'complete',
    'cancel',
    "delete",
    "createAsExhibit",
    "startTour"
  ];

  //brojevi
  numberOfOngoing = 0;
  numberOfCompleted = 0;
  numberOfCancelled = 0;

  dialogOpen: boolean = false;

  //viewChildi
  @ViewChild(MatTable) table : MatTable<any>;
  @ViewChild(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChild(MatSort) sort = new QueryList<MatSort>();
  @ViewChild('auto') matAutoComplete: MatAutocomplete;

  //dialogInfo
  // isView

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private tourService : ToursService,
    private exhibitService: ExhibitsService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) { }
  

  ngOnInit(): void {

    this.toursDataSource.data = this.tours;
    this.tours.forEach( tour => {
      if(tour.status == "otkazan")
        this.numberOfCancelled++;
      else if(tour.status == "zavrsen")
        this.numberOfCompleted++;
      else if(tour.status == "tekuci")
        this.numberOfOngoing++;
    });
  }

  updateParentTours( value: TourModel[]){
    this.toursUpdate.emit(value);
  }

  doFilterTours(filterValue: string){
    this.toursDataSource.filter = filterValue.trim().toLowerCase();
  }

  createEmptyTour(){
    const id = this.localStorage.getLocalStorageItem("id");
    if(this.userService.createBlankTour(+id) !== false){
      this.toursDataSource.data = this.tours;
      this.numberOfOngoing++;
    }
    this.updateParentTours(this.userService.findItemByID(this.userID).planer);
  }

  cancel( tourID: number){
  
    let tour = this.userService.findTour(this.userID,tourID);
    
    tour.status = "otkazan";

    const user = this.userService.updateUserTour(this.userID, tour);
    if(user !== undefined){
      this.toursDataSource.data = this.tours;
      this.numberOfOngoing--;
      this.numberOfCancelled++;
    }

    this.updateParentTours(this.userService.findItemByID(this.userID).planer);
  }

  complete( tourID: number){

    let tour = this.userService.findTour(this.userID,tourID);
    
    tour.status = "zavrsen";

    const user = this.userService.updateUserTour(this.userID, tour);
    if(user !== undefined){
      this.toursDataSource.data = this.tours;
      this.numberOfOngoing--;
      this.numberOfCompleted++;
    }

    this.updateParentTours(this.userService.findItemByID(this.userID).planer);
  }

  delete( tourID : number){

    if(this.userService.deleteUserTour(this.userID, tourID)){
      this.tours = this.tours.filter(tour  => tour.id !== tourID );
      this.toursDataSource.data = this.tours;
      this.numberOfCancelled--;
    }

    this.updateParentTours(this.userService.findItemByID(this.userID).planer);
  }

  viewTour(element, editable){
    this.tourService.viewTour(element, editable);
  }

  editTour(element){
    this.tourService.viewTour(element, true);

    // this.updateParentTours();
  }

  create(tour: TourModel){
    this.exhibitService.createExhibitDialog(tour);
  }
  
  // START TOUR DIALOG OPEN
  startTour(tour: TourModel) {
    this.dialogOpen = true;

    const productDetailsDialog = this.dialog.open(StartTourComponent, {
      disableClose: true,
      width: '70vw',
      panelClass: "dialog-responsive",
      data: tour
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
