const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let currentLine = 0;
function readLine() {
    return input[currentLine++]
}

let T = readLine();

for (let i = 1; i <= T; i++) {
    console.log(`Case #${i}: ${solve()}`);
}

function solve() {

}
