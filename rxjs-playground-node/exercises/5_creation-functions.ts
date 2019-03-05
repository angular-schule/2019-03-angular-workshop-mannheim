import { of, from, timer, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const observer = {
  next: e => console.log(e),
  error: e => console.error('ERROR', e),
  complete: () => console.info('Complete')
};


of('A', 'B', 'C').subscribe(observer);
from(['A', 'B', '😍']).subscribe(observer);

var endAfter5Seconds  = timer(5000);


timer(0, 1000)
  .pipe(
    takeUntil(endAfter5Seconds)
  )
  .subscribe(observer)
