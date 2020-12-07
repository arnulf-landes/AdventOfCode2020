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

function findBag(find_bag){
  return Object.keys(bag_rules).filter(bag_rule_key => Object.keys(bag_rules[bag_rule_key]).includes(find_bag)).map(bag => {
    return [bag, findBag(bag)].flat();
  }).flat();
}
console.log(bag_rules);
console.log(Object.keys(
  findBag("shiny gold bag").reduce((acc, val) => {
    acc[val] = true;
    return acc;
  }, {})
).length);