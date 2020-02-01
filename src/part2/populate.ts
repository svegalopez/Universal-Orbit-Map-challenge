import { readFileSync } from "fs";

export type node = { [key: string]: node | null } | null;
type arrangedMap = { [key: string]: string[] };


/**
Generates a hierarchical data structure based on the provided orbit map.
In this tree of data, the root is the "COM", and the leaves of the tree
are the objects that are not orbitted by any other object, leaves have null values. 

eg:

const universe = {
    COM : {
        A : null,
        B : {
            C : null
        }
    }
}
In the universe depicted above, A and B are orbitting around COM, C is
orbitting around B, and nothing orbits C nor A.
 */
export function populateUniverse(pathToMap: string): node {
    const map = readFileSync(pathToMap, 'utf-8');
    const arranged = preProcess(map);
    const universe: node = {};

    populate(universe, arranged, "COM")
    return universe
}

function populate(node: node, map: arrangedMap, childKey: string): void {
    const children = map[childKey]

    if (node === null) return
    if (children === undefined) return

    for (let c of children) {
        if (!node[childKey]) node[childKey] = {}
        node[childKey]![c] = null
        populate(node[childKey], map, c)
    }
}

function preProcess(map: string): arrangedMap {
    const arranged: arrangedMap = {};
    const lines = map.split('\n');

    lines.forEach(l => {
        const relationship = l.split(')');
        const parentNode = relationship[0];
        const childNode = relationship[1];
        if (arranged[parentNode] === undefined) arranged[parentNode] = [childNode]
        else arranged[parentNode].push(childNode)
    })
    return arranged
}