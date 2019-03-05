import { Observable } from 'rxjs';

const myObservable$ = new Observable<number>(observer => {

  observer.next(1);
  observer.next(2);
  observer.next(3);

  setTimeout(() => observer.error('🤬'), 3000);

  observer.next(4);
  // observer.complete();
});

const observer = {
  next: e => console.log(e),
  error: e => console.error('ERROR', e),
  complete: () => console.info('Complete')
};

const sub = myObservable$.subscribe(observer);

setTimeout(() => sub.unsubscribe(), 3000);

