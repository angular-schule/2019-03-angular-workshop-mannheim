import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from '../reducers/book.reducer';

export const getBooksState = createFeatureSelector<fromBook.State>('book');

export const getBooksLoading = createSelector(
  getBooksState,
  bookState => bookState.loading
);

export const getAllBooks = createSelector(
  getBooksState,
  bookState => bookState.books
);


