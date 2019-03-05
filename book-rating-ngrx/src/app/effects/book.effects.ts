import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadBooksFailure, LoadBooksSuccess, BookActionTypes,
  BookActions, LoadBookSuccess, LoadBookFailure } from '../actions/book.actions';
import { BookStoreService } from '../shared/book-store.service';



@Injectable()
export class BookEffects {

  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(BookActionTypes.LoadBooks),
    switchMap(() => this.service.getAll().pipe(
      map(books => new LoadBooksSuccess({ books })),
      catchError(error => of(new LoadBooksFailure({ error }))))
    )
  );

  @Effect()
  loadBook$ = this.actions$.pipe(
    ofType(BookActionTypes.LoadBook),
    switchMap(({ payload }) => this.service.getSingle(payload.isbn).pipe(
      map(book => new LoadBookSuccess({ book })),
      catchError(error => of(new LoadBookFailure({ error })))
    ))
  );

  constructor(
    private actions$: Actions<BookActions>,
    private service: BookStoreService) {}

}
