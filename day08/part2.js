const fs = require('fs');
const [NOP, JMP, ACC, ERR] = [0, 1, 2, -1];
const instructions_raw = fs.readFileSync('input.txt').toString().split('\r\n').filter(line => line.length);
const dict = {
  "nop": NOP,
  "jmp": JMP,
  "acc": ACC,
  [NOP]: "nop",
  [JMP]: "jmp",
  [ACC]: "acc"
};
var halting_indexes = [];

function load_instructions(raw_instructions){
  return raw_instructions.map(instruction => (instr_parts => Object({
    operation: dict[instr_parts[0]] ?? ERR,
    argument: +instr_parts[1]
  }))(instruction.split(' ')));
}

function run(modified_instructions){
  //console.log("running", modified_instructions);
  var ip = 0;
  var accumulator = 0;
  var visited_instructions = Object({});
  while(ip < modified_instructions.length){
    //console.log(ip, dict[modified_instructions[ip].operation], accumulator);
    visited_instructions[ip] = +visited_instructions[ip] + 1 || 1;
    switch(modified_instructions[ip].operation){
      case NOP: ip++; break;
      case ACC: accumulator += modified_instructions[ip].argument; ip++; break;
      case JMP: ip += modified_instructions[ip].argument; break;
      case ERR: console.error("bad opcode:", instructions_raw[ip], modified_instructions[ip]); ip++; break;
      default: console.error("REALLY bad opcode:", instructions_raw[ip], modified_instructions[ip]);
    }
    if(visited_instructions[ip]/*> 10*/){
      //console.log("aborting...\n");
      return false;
    }
  }
  console.log("\nfinal accumulator state:", accumulator);
  return true;
}

instructions_raw.forEach((_, idx) => {
  let modified_instructions = load_instructions(instructions_raw);
  if([NOP, JMP].includes(modified_instructions[idx].operation)){
    modified_instructions[idx].operation = (modified_instructions[idx].operation + 1) % 2; //toggles between 0 and 1 (NOP and JMP)
    run(modified_instructions) && halting_indexes.push(idx);
  }
});

console.log("halting indexes:", halting_indexes);