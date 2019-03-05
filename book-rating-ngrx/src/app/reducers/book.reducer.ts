
import { BookActions, BookActionTypes } from '../actions/book.actions';
import { Book } from '../shared/book';

export interface State {
  books: Book[];
  loading: boolean;
}

export const initialState: State = {
  books: [],
  loading: false
};

export function reducer(state = initialState, action: BookActions): State {
  switch (action.type) {

    case BookActionTypes.LoadBooks:
    case BookActionTypes.LoadBook: {
      return {
        ...state,
        loading: true
      };
    }

    case BookActionTypes.LoadBooksSuccess: {
      const { books } = action.payload;
      return {
        ...state,
        loading: false,
        books
      };
    }

    case BookActionTypes.LoadBookSuccess: {
      const { book } = action.payload;

      // demo
      book.title = 'NEU GELADEN: ' + book.title;

      const books = [
        ...state.books.filter(b => b.isbn !== book.isbn),
        book
      ].sort((a: any, b: any) => a.title - b.title);

      return {
        ...state,
        loading: false,
        books
      };
    }

    case BookActionTypes.LoadBooksFailure:
    case BookActionTypes.LoadBookFailure: {
      return {
        ...state,
        books: [],
        loading: false
      };
    }

    default:
      return state;
  }
}
