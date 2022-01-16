import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReviewModel } from 'src/app/models/ReviewModel';
import { ShowPieceModel } from 'src/app/models/ShowpieceModel';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ReviewService } from 'src/app/services/review.service';
import { ShowpieceService } from 'src/app/services/showpiece.service';
import { ToursService } from 'src/app/services/tours.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-exhibit-single-page',
  templateUrl: './exhibit-single-page.component.html',
  styleUrls: ['./exhibit-single-page.component.css']
})
export class ExhibitSinglePageComponent implements OnInit {

  canReview: boolean = false;

  constructor
  (
    private route: ActivatedRoute, 
    private showpieceService: ShowpieceService,
    private tourService: ToursService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
    private reviewService: ReviewService
  ) { }

  showpieceId: string = "";
  showpiece: ShowPieceModel = null;
  dialogOpen: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(val => { this.showpieceId = val["id"] });
    this.showpiece = this.showpieceService.findItemByID(parseInt(this.showpieceId));
    this.showpieceService.calculateScore(this.showpiece.id);
    this.canUserLeaveReview();
  }

  addShowpieceToTour(showpiece: ShowPieceModel): any {
    return this.tourService.addToTour(showpiece);
  }

  canUserLeaveReview() {
    let userId = this.localStorageService.getLocalStorageItem('id');
    
    if (userId == '' || userId == null) {
      return false;
    }
    this.canReview = this.userService.doesTourContainExhibit(+userId, this.showpiece) && 
                    !this.userService.hasAlreadyReviewed(+userId, this.showpiece);
  }

  writeAReview(reviewContent: string, userStarRating: number) {
    let userId = this.localStorageService.getLocalStorageItem('id');
    let user = this.userService.findItemByID(+userId);

    let reviewModel: ReviewModel = {
      user: user,
      comment: reviewContent,
      rating: userStarRating,
      id: 0
    }

    this.reviewService.handleReview(reviewModel, this.showpiece.id);

    this.showpiece = this.showpieceService.findItemByID(parseInt(this.showpieceId));
    
    this.canUserLeaveReview();
    // update here

  }

}
