const fs = require('fs');
const [NOP, JMP, ACC, ERR] = [0, 1, 2, -1];
const dict = { "nop": NOP, "jmp": JMP, "acc": ACC, [NOP]: "nop", [JMP]: "jmp", [ACC]: "acc" };
const instructions_raw = fs.readFileSync('input.txt').toString().split('\r\n').filter(line => line.length);
const instructions = instructions_raw.map(instruction => (instr_parts => Object({
  operation: dict[instr_parts[0]] ?? ERR,
  argument: +instr_parts[1]
}))(instruction.split(' ')));
var halting_indexes = [];

var ip = 0;
var accumulator = 0;
var visited_instructions = Object({});
while(ip < instructions.length){
  console.log(ip, dict[instructions[ip].operation], accumulator);
  visited_instructions[ip] = +visited_instructions[ip] + 1 || 1;
  switch(instructions[ip].operation){
    case NOP: ip++; break;
    case ACC: accumulator += instructions[ip].argument; ip++; break;
    case JMP: ip += instructions[ip].argument; break;
    case ERR: console.error("bad opcode:", instructions_raw[ip], instructions[ip]); ip++; break;
    default: console.error("REALLY bad opcode:", instructions_raw[ip], instructions[ip]);
  }
  if(visited_instructions[ip]){
    console.log("aborting...\n");
    break;
  }
}
console.log("final accumulator state:", accumulator);