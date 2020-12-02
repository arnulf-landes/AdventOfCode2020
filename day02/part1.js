const password_database = require('./input_transformed.json');

const valid_passwords = password_database.filter(pw_entry => (
  (matches => (
    matches.length >= pw_entry.policy.min && matches.length <= pw_entry.policy.max
  ))(
    pw_entry.pw.match(new RegExp(`${pw_entry.policy.char}`, 'g')) || []
  )
));

console.log(valid_passwords.length);