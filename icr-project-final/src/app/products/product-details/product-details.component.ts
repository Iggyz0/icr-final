import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/productModel';
import "@google/model-viewer";
import { ReviewService } from 'src/app/services/review.service';
import { ReviewModel } from 'src/app/models/reviewModel';
import { StarRatingComponent } from 'ng-starrating';
import { add } from 'cart-localstorage';
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserModel } from 'src/app/models/userModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  reviews: ReviewModel[];
  isAlreadyInTheCart: boolean = false;
  canUserWriteReview: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    private reviewService: ReviewService,
    private userService: UserService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reviewService.findAllProductReviews(this.data.id).subscribe( response => { this.reviews = response.body; } );
    this.isAlreadyInTheCart = this.isInTheCart();
    this.canWriteReview();
  }

  addToCart(){
    this.cartService.addItemToCart(this.data);
    this.isAlreadyInTheCart = this.isInTheCart();
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.data);
    this.isAlreadyInTheCart = this.isInTheCart();
  }

  isInTheCart(): boolean {
    return this.cartService.alreadyInCart(this.data);
  }

  // should return true if user can write a review for a given productId
  canWriteReview(): any {

    let userid: string = this.userService.getCurrentUser().id;

    let productid: string = this.data.id;

    this.reviewService.canUserWriteAReviewForAProduct(userid, productid).subscribe((result) => {
      if (result != null && result.length > 0) {
        return this.canUserWriteReview = true;
      } else return this.canUserWriteReview = false;
    });
  }

  writeAReview(reviewContent: string, userStarRating: number) {
    let user: UserModel = this.userService.getCurrentUser();

    let reviewModel: ReviewModel = {
      "comment": reviewContent,
      "score": userStarRating,
      "product": this.data,
      "user": user
    };

    this.reviewService.createReview(reviewModel).subscribe((result) => {
      if (result != null) {
        this.snackBar.open("Review submited!", "", {duration: 2500});
        this.canWriteReview();
        this.reviewService.findAllProductReviews(this.data.id).subscribe( response => { this.reviews = response.body; } );
      }
    });
  }
}
