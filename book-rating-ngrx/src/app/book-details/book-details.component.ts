import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, share, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadBook } from '../actions/book.actions';
import { State } from '../reducers';
import { Store, select } from '@ngrx/store';
import { getBookByIsbn, getBooksLoading } from '../selectors/book.selectors';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book>;
  loading$ = this.store$.pipe(select(getBooksLoading));

  constructor(private route: ActivatedRoute, private store$: Store<State>) { }

  ngOnInit() {

    const getIsbn$ = this.route.paramMap.pipe(
      map(params => params.get('isbn'))
    );

    // TODO: in einen @Effect!
    getIsbn$.pipe(
      map(isbn => new LoadBook({ isbn }))
    ).subscribe(this.store$);

    this.book$ = getIsbn$.pipe(
      switchMap(isbn => this.store$.pipe(
        select(getBookByIsbn, { isbn })
      ))
    );

  }
}
