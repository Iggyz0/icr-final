import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { UserModel } from '../models/userModel';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OrderModel } from '../models/orderModel';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../services/order.service';
import { ReviewModel } from '../models/reviewModel';
import { ReviewService } from '../services/review.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { LocalstorageService } from '../services/localstorage.service';
import { EditOrderComponent } from './edit-order/edit-order.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit, AfterViewInit {
  user: UserModel;
  categoryControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allCategories: string[] = [];
  filteredCategories: Observable<string[]>;
  category: any;
  maxEta: number = 5;

  dialogOpen: boolean = false;

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  //NOTE: orders tab
  orders = new MatTableDataSource<OrderModel>();
  displayedColumnsOrders = [
    'No.',
    'id',
    'dateCreated',
    'totalPrice',
    'paymentOption',
    'status',
    'minEta',
    'viewItems',
    'complete',
    'cancel',
    "delete"
  ];

  numberOfCompleted: number = 0;
  numberOfOngoing: number = 0;
  numberOfCancelled: number = 0;

  //NOTE: reviews tab

  myReviews = new MatTableDataSource<ReviewModel>();
  displayedColumnsReviews = [
    'Numero',
    'product.name',
    'comment',
    'score',
    'dateCreated',
    'edit',
  ];

  // for more than one mat paginator, we have to use ViewChildren and List of Paginators
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
    private reviewService: ReviewService,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private localStorageService: LocalstorageService
  ) {
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(null), //<- ukoliko korisnik klikne na input polje i ne unese nista, prikazace svo voce
      map((category: string | null) =>
        category ? this._filter(category) : this.allCategories.slice()
      )
    );
    //Ako je "fruit" null filter pokazuje SVO voce,
    //u suprotnom voca koja se poklapaju sa imenom u inptu polju

    // this.categoryControl.valueChanges.subscribe(search => {
    //   console.log("konstruktor sub");
    //   console.log(search);
      
      
    //   this.filteredCategories = of(this.allCategories.filter(item =>
    //     {item.valueOf().toLowerCase().includes(search);}
    //   ));
    // });

  }

  ngOnInit(): void {
    this.userService
      .getUserByUsernameFromTheServer(localStorage.getItem('username'))
      .subscribe((response: UserModel) => {
        this.user = response;
        if (!this.user.favourites) {
          this.user.favourites = [];
        }
      });

    this.productService
      .findAllCategories()
      .subscribe((response) => (this.allCategories = response));

    this.orderService
      .fetchAllUserOrders()
      .subscribe((response) => (this.orders.data = response));

    this.reviewService
      .findAllUserReviews({ username: localStorage.getItem('username') })
      .subscribe((response) => (this.myReviews.data = response.body));
  }

  ngAfterViewInit() {
    this.orders.paginator = this.paginator.toArray()[0];
    this.orders.sort = this.sort.toArray()[0];

    this.myReviews.paginator = this.paginator.toArray()[1];
    this.myReviews.sort = this.sort.toArray()[1];

    setTimeout(() => {
      this.orders.data.forEach((order: OrderModel) => {

        if (order.status == "ongoing") {
          this.numberOfOngoing += 1;
        } else if (order.status == "complete") {
          this.numberOfCompleted += 1;
        } else if (order.status == "cancelled") {
          this.numberOfCancelled += 1;
        }

      });
    }, 500);
  }

  onSubmit(form: NgForm) {
    this.userService
      .updateUser({
        id: this.user.id,
        password: form.value.passwordConfirm,
        username: localStorage.getItem('username'),
        email: form.value.email,
        favourites: this.user.favourites,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phone: form.value.phone,
        address: {
          city: form.value.city,
          country: form.value.country,
          number: form.value.number,
          street: form.value.street,
          zipCode: form.value.zipCode,
        },
      })
      .subscribe((response) => {
        if (response != null) {
          this._snackBar.open('Successfully updated', '', { duration: 2500 });
          window.location.reload();
        } else {
          this._snackBar.open('ERROR WHILST UPLOADING', 'Too bad', {
            duration: 2500,
          });
        }
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.user.favourites.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.categoryControl.setValue(null);
  }

  remove(category: string): void {
    const index = this.user.favourites.indexOf(category);

    if (index >= 0) {
      this.user.favourites.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.user.favourites.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter((category) => {
      return category.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  // ----------------------------------------------------------------------------------

  complete(element_id) {
    this.orderService
      .updateOrder({
        id: element_id,
        status: 'complete',
      })
      .subscribe((response) => {
        if (response != null) {
          this.orders.data.find((order) => order.id == element_id).status =
            response.status;
          this._snackBar.open('Successfully completed the order', '', {
            duration: 2500,
          });
        }
      });
  }

  cancel(element_id) {
    this.orderService
      .updateOrder({
        id: element_id,
        status: 'cancelled',
      })
      .subscribe((response) => {
        if (response != null) {
          this.orders.data.find((order) => order.id == element_id).status =
            response.status;
          this._snackBar.open('Successfully cancelled the order', '', {
            duration: 2500,
          });
        }
      });
  }

  doFilterOrders(filterValue: string) {
    this.orders.filter = filterValue.trim().toLocaleLowerCase();
  }

  doFilterReviews(filterValue: string) {
    this.myReviews.filter = filterValue.trim().toLocaleLowerCase();
  }

  editReview(element) {
    this.dialogOpen = true;

    const review = this.matDialog.open(EditReviewComponent, {
      disableClose: true,
      width: '70vw',
      panelClass: 'dialog-responsive',
      data: element,
    });

    review.afterOpened().subscribe(() => {
      if (this.localStorageService.getLocalStorageItem('theme') == 'dark') {
        review.addPanelClass('darkMode');
      }
    });

    review.afterClosed().subscribe((result: ReviewModel) => {
      this.dialogOpen = false;
      this._snackBar.open('Successfully updated the review!', '', {
        duration: 2500,
      });
      this.reviewService
        .findAllUserReviews({ username: localStorage.getItem('username') })
        .subscribe((response) => (this.myReviews.data = response.body));
    });
  }

  delete(element_id) {
    this.orderService.deleteOrder(element_id).subscribe((result) => {
      if (result.ok) {

        this.orderService
      .fetchAllUserOrders()
      .subscribe((response) => (this.orders.data = response));
        this._snackBar.open("Successfully deleted cancelled order", "OK", {duration: 2500});
      }
    });
  }

  // edit order
  
  editOrder(element) {
    this.dialogOpen = true;

    const order = this.matDialog.open(EditOrderComponent, {
      disableClose: true,
      width: '70vw',
      panelClass: 'dialog-responsive',
      data: element,
    });

    order.afterOpened().subscribe(() => {
      if (this.localStorageService.getLocalStorageItem('theme') == 'dark') {
        order.addPanelClass('darkMode');
      }
    });

    order.afterClosed().subscribe((result: OrderModel) => {
      if (result.items.length == 0) {
        this.delete(result.id);
      }
      this.dialogOpen = false;
      this._snackBar.open('Successfully updated the order!', '', {
        duration: 2500,
      });
      this.orderService
        .fetchAllUserOrders()
        .subscribe((response) => (this.orders.data = response));
    });
  }






}
