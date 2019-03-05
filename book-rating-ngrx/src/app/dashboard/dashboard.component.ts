import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { LoadBooks } from '../actions/book.actions';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loading$ = of(false); // TODO: Implement logic
  books$ = this.service.getAll();

  constructor(
    private service: BookStoreService,
    private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadBooks());
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
