import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel } from 'src/app/models/productModel';
import { ReviewModel } from 'src/app/models/reviewModel';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReviewModel,
    private reviewService: ReviewService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditReviewComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(comment, score){
    this
    .reviewService
    .updateReview({
      id: this.data.id,
      comment: comment,
      product: this.data.product,
      score: score,
      user: this.data.user
    })
    .subscribe(
      response => {
        if(response != null){
          this.dialogRef.close(response);
        }
      }
    );
  }

}
