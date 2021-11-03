const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let currentLine = 0;
function readLine() {
    return input[currentLine++]
}

console.time('solve');
let T = readLine();

for (let i = 1; i <= T; i++) {
    const [x, y] = solve();
    console.log(`Case #${i}: ${x} ${y}`);
}

function solve() {
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

    let optimalX = findOptimalInRange(
        mostLeft,
        mostRight,
        (x) => objects.filter((object) => x < object[0]),
        (x) => objects.filter((object) => object[2] <= x)
    )


    let optimalY = findOptimalInRange(
        mostBottom,
        mostTop,
        (y) => objects.filter((object) => y < object[1]),
        (y) => objects.filter((object) => object[3] <= y)
    )

    return [optimalX, optimalY];
}

function findOptimalInRange(lowerBoundary, upperBoundary, getAhead, getBehind) {
    let optimal = null;

    while (optimal === null) {
        let step = Math.max(Math.ceil((upperBoundary - lowerBoundary) / 10), 1);
        let lastResult = Number.MAX_VALUE;
        let stop = false;

        for (let i = 0; i <= Math.min(10, upperBoundary - lowerBoundary) && stop === false; i++) {
            let value = lowerBoundary + (i * step);
            const objectsAheadOfX = getAhead(value);
            const objectsBehindX = getBehind(value);
            const result = objectsAheadOfX.length - objectsBehindX.length;

            if (result <= 0) {
                stop = true; // Flag to break the current loop.
                if (step === 1) {
                    optimal = value;
                } else {
                    // If the step is not equal to 1, we aren't checking individual values but are still looking for
                    // the range in which the optimal value is.
                    lowerBoundary = lowerBoundary + ((i - 1) * step);
                    upperBoundary = value;
                }
            } else if (result < lastResult) {
                // The current result is better than the previous result.
                // This means that we should check i + 1 as well to see whether that's an even better result
                // and keep the loop going.
                lastResult = result;
            } else if (result > lastResult) {
                // Result of current x is greater than it was for i - 1.
                // This means that there are more steps necessary for x in i than for x in i - 1.
                // -> Optimal value is <= the previous x value we checked.
                // Because x in i - 1 has a better result than x in i - 2, we take i - 2 as the lower boundary.
                stop = true;
                lowerBoundary = lowerBoundary + ((i - 2) * step);
                upperBoundary = lowerBoundary + ((i - 1) * step);
            }
        }
    }

    return optimal;
}
console.timeEnd('solve');
