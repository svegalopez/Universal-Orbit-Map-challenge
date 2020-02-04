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
    const r = traverse(d, c, 0, c);
    if (r !== null) {
        console.log('The result is: ', r)
    }
}

function traverse(d: any, startingPoint: string, step: number, leaf: string): number | null {

    const node = d[startingPoint]
    travelPaths[leaf][node] = step

    if (leaf === 'DST' && travelPaths.YOU[node] !== undefined) {
        return travelPaths.YOU[node] + step // When it reaches nearest common ancestor it returns
    }

    if (d[node] === undefined) return null // When it reaches COM it returns
    step++
    return traverse(d, node, step, leaf);
}