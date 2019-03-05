import { from } from 'rxjs';
import { map, filter, reduce, scan } from 'rxjs/operators';

let dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

from(dataArray)
  .pipe(
    map(x => x * 10),
    filter(x => x > 40),
    map(x => x + 1),
    scan((acc, currentValue) => acc + currentValue) // grundlage von NgRx
  )
  .subscribe(console.log, undefined, () => console.log('Complete!'));
