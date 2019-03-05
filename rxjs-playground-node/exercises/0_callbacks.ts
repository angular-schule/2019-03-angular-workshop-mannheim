function connect1(callback) {
  setTimeout(() => callback(), 2000);
}

function read1(callback) {
  setTimeout(() => callback(), 2000);
}

function close1(callback) {
  setTimeout(() => callback(), 2000);
}

/**********************************/

connect1((err, value) => {

  if(err) { return };
  console.log('Connected');

  read1((err1, value1) => {
    if(err1) { return; }
    console.log('I got data!')
  });
});
