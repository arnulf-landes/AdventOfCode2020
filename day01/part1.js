const numbers = require('./input.json');

numbers.forEach(n1 => {
  numbers.forEach(n2 => {
    if(n1 + n2 == 2020) console.log(n1 * n2);
  });
});