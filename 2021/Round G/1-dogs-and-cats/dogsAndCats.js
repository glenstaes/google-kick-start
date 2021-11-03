const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let currentLine = 0;
function readLine() {
    return input[currentLine++]
}

let T = readLine();

for (let i = 1; i <= T; i++) {
    let [N, D, C, M] = readLine().split(' ').map(v => parseInt(v));
    let S = readLine();
    console.log(`Case #${i}: ${solve(N, D, C, M, S)}`)
}

function solve(animalsInLine, dogPortions, catPortions, extraCatPortions, dcSequence) {
    for (let j = 0; j < animalsInLine; j++) {
        if (dcSequence[j] === 'D') {
            if (dogPortions <= 0 || catPortions < 0) {
                return 'NO';
            }

            dogPortions--;
            catPortions += extraCatPortions;
        } else {
            catPortions--;
        }
    }

    return 'YES';
}
