import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { State } from '../reducers';
import { Store, select } from '@ngrx/store';
import { LoadBooks } from '../actions/book.actions';
import { getBooksLoading, getAllBooks } from '../selectors/book.selectors';
import * as fromBook from '../reducers/book.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loading$ = this.store$.pipe(select(getBooksLoading));
  books$ = this.store$.pipe(select(getAllBooks));

  // okay, aber auch nicht so geil:
  // books2$ = this.store$.select((state: { book: fromBook.State }) => state.book.loading);
  // books3$ = this.store$.pipe(map((state: { book: fromBook.State }) => state.book.loading));

  constructor(
    private service: BookStoreService,
    private store$: Store<State>) { }

  ngOnInit() {
    this.store$.dispatch(new LoadBooks());
  }

  doRateUp(book: Book) {
    const rating = Math.min(5, book.rating + 1);
    this.service.setRating(book.isbn, rating)
      .subscribe(e => console.log(e));
  }

  doRateDown(book: Book) {
    const rating = Math.max(1, book.rating - 1);
    this.service.setRating(book.isbn, rating)
      .subscribe(e => console.log(e));
  }
}
