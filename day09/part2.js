const fs = require('fs');
const sum = (...ns) => ns.reduce((s, n) => +s + n);
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

function getFirstInvalid(){
  while(num_pointer < numbers.length){
    if(!isValid(numbers[num_pointer])){
      return numbers[num_pointer];
    }
    num_pool = [...num_pool.slice(1), numbers[num_pointer]];
    num_pointer++;
  }
  throw "couldn't find any invalid numbers";
}

const firstInvalid = getFirstInvalid();
console.log("target:", firstInvalid);

function findSequence(){
  for(i = 0; i < numbers.length; i++){
    let d = 1;
    let s = 0;
    while(s <= firstInvalid){
      if(s === firstInvalid) return [i, i + d - 1];
      s = sum(...numbers.slice(i, i + d));
      d++;
    }
  }
  return false;
}

const seq = numbers.slice(...findSequence());
console.log(seq, Math.min(...seq) + Math.max(...seq));