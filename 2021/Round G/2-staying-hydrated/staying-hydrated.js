// 18:07

const fs = require('fs');
const input = fs.readFileSync('./stayingHydrated.sample1.txt', 'utf8').trim().split('\n');

let currentLine = 0;
function readLine() {
    return input[currentLine++]
}

console.time('solve');
let T = readLine();

for (let i = 1; i <= T; i++) {
    const [x, y] = solve(i);
    console.log(`Case #${i}: ${x} ${y}`);
}

function solve(i) {
    const K = parseInt(readLine());
    let objects = [];
    let mostRight = Number.MIN_VALUE;
    let mostLeft = Number.MAX_VALUE;
    let mostTop = Number.MIN_VALUE;
    let mostBottom = Number.MAX_VALUE;

    for (let j = 1; j <= K; j++) {
        const [Xi1, Yi1, Xi2, Yi2] = readLine().split(' ').map(v => parseInt(v));
        mostRight = Math.max(mostRight, Xi1, Xi2);
        mostLeft = Math.min(mostLeft, Xi1, Xi2);
        mostTop = Math.max(mostTop, Yi1, Yi2);
        mostBottom = Math.min(mostBottom, Yi1, Yi2);

        objects.push([Xi1, Yi1, Xi2, Yi2]);
    }

    // 'playing field' = [(mostLeft, mostBottom), (mostRight, mostTop)]
    let smallestSteps = Number.MAX_VALUE;
    let smallestCoords = null;
    for (let x = mostLeft; x <= mostRight; x++) {
        for (let y = mostBottom; y <= mostTop; y++) {
            const sum = objects.reduce((value, [Xi1, Yi1, Xi2, Yi2]) =>
                value + Math.max(Xi1 - x, 0, x- Xi2) + Math.max(Yi1 - y, 0, y - Yi2), 0);

            if (i === 90 && x < -1 && x > -4 && y < -13 && y > -16)
                console.log(x, y, sum);
            if (sum < smallestSteps) {
                smallestSteps = sum;
                smallestCoords = [x, y];
            }
        }
    }

    return smallestCoords;
}
console.timeEnd('solve');
