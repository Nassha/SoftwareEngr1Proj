import {SWAP} from '../helper/constants.js';
import {swap} from '../helper/swap.js';

// insertion sort algorithm for the sorting visualizer
// this function returns a container with 2 indexes and boolean
export const insertionSort = async(array, length) => {
    let moves = [];
    for(let i = 0 ; i < length-1 ; ++i) {
        let j = i;
        while(j >= 0 && array[j] > array[j+1]) {
            await swap(array, j, j+1);
            moves.push([j, j+1, SWAP]);
            --j;
        }
    }
    return moves;
};