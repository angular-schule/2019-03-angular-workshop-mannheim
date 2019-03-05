import { simpleTimer$ } from './data/simple-timer';

// TODO: Subscribe



simpleTimer$.subscribe(
  e => {
  console.log(e)
  },
  err =>  console.error(err),
  () => console.log('Complete!'));
