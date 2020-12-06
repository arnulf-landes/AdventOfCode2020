const fs = require('fs');
const answers = fs.readFileSync('./input.txt').toString().split('\r\n\r\n').map(group => group.split('\r\n'));
const group_answers = answers.map(group => group.map(person => person.split('')).reduce((acc, val) => (
  acc.filter(answer => val.includes(answer))
)));

console.log(
  group_answers.map(group => group.length).reduce((acc, val) => +acc + val)
);

/*
map(group => group.split('').reduce((acc, val) => {
  acc[val] = 1;
  return acc;
}, {}));
*/