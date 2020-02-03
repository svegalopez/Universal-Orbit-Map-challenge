import { readFileSync } from 'fs';

const file = readFileSync('data.txt', 'utf-8');
const lines = file.split('\n');
const lines2 = lines.map(el => el.split(')'));
const d: { [key: string]: any } = {}

for (const s of lines2) {
    d[s[1]] = s[0]
}

let travelPaths: { [key: string]: any } = {
    YOU: {},
    DST: {}
}

for (let c of ["YOU", "DST"]) {
    const n = traverse(d, c, 0, c)
}

function traverse(d: any, startingPoint: string, step: number, leaf: string): [number, string] {

    const node = d[startingPoint]
    travelPaths[leaf][node] = step

    if (d[node] === undefined) return [step, node] // When it reaches COM it returns
    step++
    return traverse(d, node, step, leaf);
}
const travelPathYou = Object.keys(travelPaths.YOU).reverse();
const travelPathDst = Object.keys(travelPaths.DST).reverse();

let closestCommonAncestor = '';
for (let i = 0; i < travelPathYou.length; i++) {
    if (travelPathYou[i] !== travelPathDst[i]) {
        closestCommonAncestor = travelPathYou[i-1]
        break
    }
}

let result = travelPaths.YOU[closestCommonAncestor] + travelPaths.DST[closestCommonAncestor]
if(closestCommonAncestor=== '') result = 0
console.log(result)