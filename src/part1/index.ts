import { readFileSync } from 'fs';

const file = readFileSync('data.txt', 'utf-8');
const lines = file.split('\n');
const lines2 = lines.map(el => el.split(')'));
const d: { [key: string]: any } = {}

for (const s of lines2) {
    d[s[1]] = s[0]
}

let count: number = 0;
for (let c of Object.keys(d)) {
    const n = traverse(d, c, 0)
    count = count + n
}

function traverse(d: any, startingPoint: string, step: number): number {
    step++
    const node = d[startingPoint]
    if (d[node] === undefined) return step
    return traverse(d, node, step);
}

console.log(count);