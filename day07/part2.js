const fs = require('fs');

const bag_rules = fs.readFileSync('input.txt').toString().split('\r\n').map(line => line.split(' contain ')).reduce((acc, val) => {
  acc[val[0].replace(/s$/, '')] = val[1].split(', ').reduce((acc2, val2) => {
    val2 = val2.replace(/\.$/, '');
    if(val2 === "no other bags") return {};
    acc2[
      val2.split(' ').slice(1).join(' ').replace(/s$/, '')
    ] = val2.split(' ')[0];
    return acc2;
  }, {});
  return acc;
}, {});

function getContainedBags(bag_colour){
  return Object.keys(bag_rules[bag_colour]).map(key => {
    return +bag_rules[bag_colour][key] + +bag_rules[bag_colour][key] * getContainedBags(key);
  }).reduce((acc, val) => +acc + val, 0);
}

console.log(getContainedBags("shiny gold bag"));