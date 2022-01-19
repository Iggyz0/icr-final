import { Injectable } from '@angular/core';
import { ReviewModel } from '../models/ReviewModel';
import { GenericCRUD } from './GenericCrudService';
import { ReadingJSONService } from './reading-json.service';
import dataFile from '../../assets/Data/Review.json';
import { ShowpieceService } from './showpiece.service';
import { MatDialog } from '@angular/material/dialog';
import { EditreviewComponent } from '../myreviews/editreview/editreview.component';
import { LocalStorageService } from './localstorage.service';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends GenericCRUD<ReviewModel> {
  fajl: string = "Review.json";

  dialogOpen: boolean = false;

  constructor(
    private readingJSON: ReadingJSONService,
    private showpieceService: ShowpieceService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private matSnackbar: MatSnackBar
  ){
    super(readingJSON);

    this.readFromFile();
  }

  public readFromFile(): void {
    this.items = dataFile;
  }

  public handleReview(reviewModel: ReviewModel, showpieceId: number) {
    let id = this.insertItemReturnID(reviewModel);
    let review = this.findItemByID(id);
    let showpieceReviewed = this.showpieceService.findItemByID(showpieceId);
    showpieceReviewed.recenzije.push(review);
    this.showpieceService.updateItem(showpieceReviewed);
    this.showpieceService.calculateScore(showpieceId);
    this.matSnackbar.open("Review posted!", "OK", { duration: 2500 });
  }

  public handleUpdateReview(review: ReviewModel, showpiece: ShowPieceModel) {
    this.updateItem(review);

    let newReviews = showpiece.recenzije.filter((rev) => rev.id != review.id);
    newReviews.push(review);
    newReviews = newReviews.sort((rev1, rev2) => rev1.id - rev2.id);

    showpiece.recenzije = newReviews;
    if (this.showpieceService.updateItem(showpiece)) {
      this.matSnackbar.open("Review updated!", "OK", { duration: 2500 });
      return showpiece;
    }

    return false;
  }

  public updateReview(review: ReviewModel, showpieceId: ShowPieceModel) {

    this.dialogOpen = true;

    const productDetailsDialog = this.dialog.open(EditreviewComponent, {
      disableClose: true,
      width: '70vw',
      panelClass: "dialog-responsive",
      data: {
        review: review,
        showpieceId: showpieceId
      }
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
