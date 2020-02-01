import { node } from "./populate";

/** 
Finds the path to a value in a json tree.
eg: 

const myObject = {
    foo : {
        bar : {
            YOU : null
        }
    }
}

findPath(myObject, 'YOU') -> 'foo.bar'

 * */
export function findPath(tree: node, name: string): string | null {

    if(tree === null) throw Error('The universe imploded!');
    if (tree[name] !== undefined) return ""

    for (const key of Object.keys(tree)) {
        if (tree[key]) {
            const found = findPath(tree[key], name)
            if (found !== null) {
                let stage = found ? ('.' + found) : '';
                return key + stage
            }
        }
    }
    return null
}