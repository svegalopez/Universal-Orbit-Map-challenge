import { readFileSync } from 'fs';

const file = readFileSync('data.txt', 'utf-8');
const lines = file.split('\n');
const lines2 = lines.map(el => el.split(')'));
const d: { [key: string]: any } = {}

for (const s of lines2) {
    d[s[1]] = s[0]
}

let travelPaths: { [key: string]: string[] } = {
    YOU: [],
    DST: []
}

let result;
for (let c of ["YOU", "DST"]) {

    const n = traverse(d, c, 0, c)

    if (c === "DST") {
        const f = travelPaths.YOU.indexOf(n[1]);
        result = (travelPaths.YOU.length - f - 1) + n[0]
    }

}

function traverse(d: any, startingPoint: string, step: number, leaf: string): [number, string] {

    const node = d[startingPoint]
    
    if (leaf === "DST") {
        if (travelPaths.YOU.find(el => el === node)) return [step, node] // When it reaches Neares Common Ancestor it returns
    }

    step++
    travelPaths[leaf].unshift(node)

    if (d[node] === undefined) return [step, node] // When it reaches COM it returns
    return traverse(d, node, step, leaf);
}

console.log(result)