import { simpleTimer$ } from './data/simple-timer';

const oberserver = {
  next: e => console.log(e),
  error: err =>  console.error(err),
  complete: () => console.log('Complete!')
}

const subscription = simpleTimer$.subscribe(oberserver);

// Angular: ngOnDestory, takeUntil, takeWhile
setTimeout(() => subscription.unsubscribe(), 3000);

