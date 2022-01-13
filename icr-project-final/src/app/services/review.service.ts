import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewModel } from '../models/reviewModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = "http://localhost:8080/reviews/";

  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(){
    return this.httpClient.get<ReviewModel[]>(this.url+"findallreviews", {observe: "response"});
  }

  findAllUserReviews(user){

    return this.httpClient.get<ReviewModel[]>(this.url+"getuserreviews/"+user.username, {observe: "response"});
  }

  findAllProductReviews(id: string){
    return this.httpClient.get<ReviewModel[]>(this.url+"findallbyproductid/"+id, {observe: "response"});

  }

  didUserWriteAReviewForAProduct(username: string, productid: string): Observable<ReviewModel[]> {
    const url = "http://localhost:8080/reviews/getuserreviews/" + username + "/" + productid;

    return this.httpClient.get<ReviewModel[]>(url, { observe: 'body' });
  }

  canUserWriteAReviewForAProduct(userid: string, productid: string): Observable<string[]> {
    const url = "http://localhost:8080/reviews/canreview?userid=" + userid + "&productid=" + productid;

    return this.httpClient.get<string[]>(url, { observe: 'body' });
  }

  createReview(reviewModel: ReviewModel): Observable<ReviewModel[]> {
    const url = "http://localhost:8080/reviews/createareview";

    return this.httpClient.post<ReviewModel[]>(url, reviewModel, { observe: 'body' });
  }

  updateReview(reviewModel: ReviewModel){
    const url = "http://localhost:8080/reviews/updatereview";

    return this.httpClient.put<ReviewModel>(url, reviewModel, { observe: 'body' });

  }
}
