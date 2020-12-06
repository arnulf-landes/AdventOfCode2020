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
  (passport.byr >= 1920 && passport.byr <= 2002) &&
  (passport.iyr >= 2010 && passport.iyr <= 2020) &&
  (passport.eyr >= 2020 && passport.eyr <= 2030) &&
  (passport.hgt && ((val, unit) => {
    if(unit === 'cm'){
      return (val >= 150 && val <= 193);
    }else if(unit == 'in'){
      return (val >= 59 && val <= 76);
    }else return false;
  })(passport.hgt.slice(0, -2), passport.hgt.slice(-2))) &&
  ((/^#[a-f0-9]{6}$/).test(passport.hcl)) &&
  "amb,blu,brn,gry,grn,hzl,oth".split(',').includes(passport.ecl) &&
  (/^[0-9]{9}$/).test(passport.pid)
);

console.log(valid_passports.length);