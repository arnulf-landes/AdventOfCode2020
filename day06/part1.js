const fs = require('fs');
const answers = fs.readFileSync('./input.txt').toString().split('\r\n\r\n').map(group => (
  group.replace(/\s\s?/g, '')
)).map(group => group.split('').reduce((acc, val) => {
  acc[val] = 1;
  return acc;
}, {}));

console.log(
  answers.map(group => Object.keys(group).length).reduce((acc, val) => +acc + val)
);