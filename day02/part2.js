const fs = require('fs');
const password_database = JSON.parse('['+fs.readFileSync('./input.txt').toString().replace(/([0-9]+)\-([0-9]+)\s(.)\:\s([a-z]+)/g, '{"pw": "$4", "policy": {"char": "$3", "min": $1, "max": $2}},').slice(0, -1)+']');

const valid_passwords = password_database.filter(pw_entry => (
  !!((
    (pw_entry.pw[pw_entry.policy.min - 1] === pw_entry.policy.char) +
    (pw_entry.pw[pw_entry.policy.max - 1] === pw_entry.policy.char)
  ) % 2)
));

console.log(valid_passwords.length);