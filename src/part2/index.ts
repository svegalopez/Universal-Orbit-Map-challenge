import { findPath } from './findPath';
import { populateUniverse } from './populate';

const universe = populateUniverse('data.txt');

const pathToYou = findPath(universe, "YOU");
if (pathToYou === null) throw Error('You are nowhere to be found in the universe')
const pathToYouArr = pathToYou.split('.');

const pathToDst = findPath(universe, "DST");
if (pathToDst === null) throw Error('Your destination was swallowed by a black hole')
const pathToDstArr = pathToDst.split('.')

let closestCommonAncestor = ''
for (let i = 0; i < pathToYouArr.length; i++) {
    if (pathToYouArr[i] !== pathToDstArr[i]) {
        closestCommonAncestor = pathToYouArr[i-1]
        pathToYouArr.splice(0, i)
        pathToDstArr.splice(0, i)
        break
    }
}

let minNumberOfTransfers;
if(closestCommonAncestor === '') minNumberOfTransfers = 0;
else minNumberOfTransfers = pathToYouArr.length + pathToDstArr.length

console.log('Welcome the Universal Orbit Map facility')
console.log("Your connecting node is: ", closestCommonAncestor);
console.log(`You need to take ${minNumberOfTransfers} orbit transfers`);





