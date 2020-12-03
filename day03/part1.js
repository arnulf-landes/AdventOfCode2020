const fs = require('fs');
const treemap = fs.readFileSync('./input.txt').toString().split('\r\n').filter(line => line.length);


var posX = 0;
var posY = 0;
var tree_encounters = 0;

while(posY < treemap.length){
  tree_encounters += +(treemap[posY][posX] === '#');
  posX = (posX + 3) % treemap[posY].length;
  posY++;
}

console.log(tree_encounters);