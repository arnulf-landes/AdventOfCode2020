const fs = require('fs');
const numbers = fs.readFileSync('input.txt').toString().split('\r\n').map(n => +n);

numbers.forEach(n1 => {
  numbers.forEach(n2 => {
    numbers.forEach(n3 => {
      if(n1 + n2 + n3 == 2020) console.log(n1 * n2 * n3);
    });
  });
});