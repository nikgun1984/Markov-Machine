const fs = require('fs');
const {MarkovMachine} = require('./markov');


const content = fs.readFileSync("eggs.txt", 'utf8');

const machine = new MarkovMachine(content);
console.log(machine.words);
console.log(machine.makeText());
