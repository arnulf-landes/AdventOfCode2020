const fs = require('fs');
const seat_data = fs.readFileSync('./input.txt').toString().split('\r\n').map(seat_str => (
  parseInt(seat_str.slice(0, -3).replace(/F/g, '0').replace(/B/g, '1'), 2) * 8 +
  parseInt(seat_str.slice(-3).replace(/L/g, '0').replace(/R/g, '1'), 2)
));

console.log(
  +seat_data.filter(seatID => !seat_data.includes(seatID + 1) && seat_data.includes(seatID + 2)) + 1
);