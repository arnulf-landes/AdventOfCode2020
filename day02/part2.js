const password_database = require('./input_transformed.json');

const valid_passwords = password_database.filter(pw_entry => (
  !!((
    (pw_entry.pw[pw_entry.policy.min - 1] === pw_entry.policy.char) +
    (pw_entry.pw[pw_entry.policy.max - 1] === pw_entry.policy.char)
  ) % 2)
));

console.log(valid_passwords.length);