const fs = require('fs');
const password_database = JSON.parse('['+fs.readFileSync('./input.txt').toString().replace(/([0-9]+)\-([0-9]+)\s(.)\:\s([a-z]+)/g, '{"pw": "$4", "policy": {"char": "$3", "min": $1, "max": $2}},').slice(0, -1)+']');

const valid_passwords = password_database.filter(pw_entry => (
  (matches => (
    matches.length >= pw_entry.policy.min && matches.length <= pw_entry.policy.max
  ))(
    pw_entry.pw.match(new RegExp(`${pw_entry.policy.char}`, 'g')) || []
  )
));

console.log(valid_passwords.length);