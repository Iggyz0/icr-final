import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewModel } from '../models/ReviewModel';
import { ShowPieceModel } from '../models/ShowpieceModel';
import { TourModel } from '../models/TourModel';
import { ReviewService } from '../services/review.service';
import { ShowpieceService } from '../services/showpiece.service';

interface CustomReview {
  showpiece: ShowPieceModel,
  review: ReviewModel
}

@Component({
  selector: 'app-myreviews',
  templateUrl: './myreviews.component.html',
  styleUrls: ['./myreviews.component.css']
})

export class MyreviewsComponent implements OnInit {

  @Input() reviews: TourModel[];
  @Output() reviewsUpdate = new EventEmitter<TourModel[]>();
  @Input() userID!: number;

  // @Input() showpiece: ShowPieceModel;
  // @Input() review: ReviewModel;

  reviewDataSource = new MatTableDataSource<CustomReview>();
  displayedColumnsOrders = [
    'No.',
    'reviewId',
    "showpieceId",
    'rating',
    'vrsta',
    'cena',
    'vremeObilaska',
    'Edit'
  ];

  allUserReviews: ReviewModel[] = [];

  constructor(private showpieceService: ShowpieceService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    for(let tour of this.reviews) {
      for(let showpiece of tour.eksponat.values()) {
        for (let rev of showpiece.recenzije) {
          if(rev.user.id == this.userID) {
            this.allUserReviews.push(rev);
          }
        }
      }
    }

    let temp: CustomReview[] = [];
    this.allUserReviews.forEach(review => {
      this.showpieceService.getAllItems().forEach(showpiece => {
        if(showpiece.recenzije.includes(review)) {
          temp.push(
            {
              review: review,
              showpiece: showpiece
            }
          );
        }
      });
    });

    this.reviewDataSource.data = temp;

    console.log(temp);
    
    
  }

  reviewsUpdateParent() {
    this.reviewsUpdate.emit();
  }

  doFilterReviews(filterValue: string){
    this.reviewDataSource.filter = filterValue.trim().toLowerCase();
  }

  editReview(element: CustomReview){
    this.reviewService.updateReview(element.review, element.showpiece);
  }

}
