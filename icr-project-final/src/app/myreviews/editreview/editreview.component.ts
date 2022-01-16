import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-editreview',
  templateUrl: './editreview.component.html',
  styleUrls: ['./editreview.component.css']
})
export class EditreviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<EditreviewComponent>,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {

  }

  cancel() {
    this.dialogRef.close();
  }

  updateAReview(reviewContent: string, userStarRating: number) {
    this.data.review.comment = reviewContent;
    this.data.review.rating = userStarRating;

    this.reviewService.handleUpdateReview(this.data.review, this.data.showpieceId);

    this.dialogRef.close();
  }

}
