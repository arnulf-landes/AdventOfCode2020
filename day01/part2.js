const numbers = require('./input.json');

numbers.forEach(n1 => {
  numbers.forEach(n2 => {
    numbers.forEach(n3 => {
      if(n1 + n2 + n3 == 2020) console.log(n1 * n2 * n3);
    });
  });
});