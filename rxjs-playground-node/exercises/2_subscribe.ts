import { simpleTimer$ } from './data/simple-timer';


const oberserver = {
  next: e => console.log(e),
  error: err =>  console.error(err),
  complete: () => console.log('Complete!')
}

simpleTimer$.subscribe(oberserver);
