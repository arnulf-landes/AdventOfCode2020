const fs = require('fs');
const treemap = fs.readFileSync('./input.txt').toString().split('\r\n').filter(line => line.length);

function getTreeEncounters(deltaX, deltaY){
  var posX = 0;
  var posY = 0;
  var tree_encounters = 0;
  
  while(posY < treemap.length){
    tree_encounters += +(treemap[posY][posX] === '#');
    posX = (posX + deltaX) % treemap[posY].length;
    posY += deltaY;
  }
  
  return tree_encounters;
}

const tree_encounter_stats = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
].map(slope => getTreeEncounters(...slope));

console.log(tree_encounter_stats, tree_encounter_stats.reduce((acc, val) => +acc * val));