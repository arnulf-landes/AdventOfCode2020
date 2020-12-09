const fs = require('fs');
const numbers = fs.readFileSync('input.txt').toString().split('\r\n').map(n => +n);
const preamble_length = 25;
var num_pool = numbers.slice(0, preamble_length);
num_pointer = preamble_length;

function isValid(n){
  return num_pool.reduce((acc1, num1) => (
    acc1 || num_pool.filter(num => num !== num1).reduce((acc2, num2) => (
      acc2 || num1 + num2 === n
    ), false)
  ), false);
}

while(num_pointer < numbers.length){
  if(!isValid(numbers[num_pointer])){
    console.log(numbers[num_pointer]);
    break;
  }
  num_pool = [...num_pool.slice(1), numbers[num_pointer]];
  num_pointer++;
}