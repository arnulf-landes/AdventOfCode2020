const fs = require('fs');
const passport_data = fs.readFileSync('./input.txt').toString().replace(
  /(.*?)\:(.*?)\s\s?/g, '$1:$2\r\n'
).split('\r\n\r\n').map(passport => (
  passport.split('\r\n').map(passport_property => passport_property.split(':'))
)).map(passport => passport.reduce((acc, val) => {
  acc[val[0]] = val[1];
  return acc;
}, {}));

const valid_passports = passport_data.filter(passport =>
  passport.byr &&
  passport.iyr &&
  passport.eyr &&
  passport.hgt &&
  passport.hcl &&
  passport.ecl &&
  passport.pid
);

console.log(valid_passports.length);