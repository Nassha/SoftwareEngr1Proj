import React from 'react';

// algorithms
import { bubbleSort } from '../sortingAlgorithms/bubbleSort.js';
import { insertionSort } from '../sortingAlgorithms/insertionSort.js';
import { mergeSort } from '../sortingAlgorithms/mergeSort.js';
import { quickSort } from '../sortingAlgorithms/quickSort.js';
import { heapSort } from '../sortingAlgorithms/heapSort.js';


// components
import Navbar from '../sortingNavbar';
import SortType from '../sortingSortType';
import Frame from '../sortingFrame';

// helpers
import pause from '../helper/pause';
import generator from '../helper/generator';
import {ALGORITHM, SPEED, SIZE, SWAP, CURRENT, NORMAL, DONE} from '../helper/constants';
import { getKeysCopy } from '../helper/keys.js';
import { isVisible } from '@testing-library/user-event/dist/utils';

let executionTime = " ";
class Visualizer extends React.Component {
   //all the elements present in the list have a key and class type
   //key (value of comment in integer)
   //classtype (Css Class)
    state = {
        list: [],
        size: 10,
        speed: 1,
        algorithm: 1,
        running: false,
    };

    // creating the list
    componentDidMount() {
        this.generateList();
    }

    //When there is a change or event
    componentDidUpdate() {
        this.onChange();
        this.generateList();
    }
    //Rendering the Sorting Visualizer
    render() { 
        return (
            <React.Fragment>
                <SortType
                    start = {this.start}
                    response = {this.response}
                    newList = {this.generateList}
                    onChange = {this.onChange}
                    
                />
                <Frame 
                    list = {this.state.list}
                />
                <div className='ExecutionTime'>
                    <h1>{executionTime}</h1>
                </div>
                <Navbar
                    start = {this.start}
                    response = {this.response}
                    newList = {this.generateList}
                    onChange = {this.onChange}
                />
                
        
            </React.Fragment>
        );
    }

    // updates the state when you choose a navbar options
    // when the algorithm is running avoid changing navbar options
    onChange = (value, option) => {
        if(option === ALGORITHM && !this.state.running) {
            this.setState({ algorithm: Number(value) });
        }
        else if(option === SPEED) {
            this.setState({ speed: Number(value) });
        }
        else if(option === SIZE && !this.state.running) {
            this.setState({ size: Number(value) });
            this.generateList();
        }
    };

    // creates a random list of values
    generateList = (value = 0) => {
        if((this.state.list.length !== this.state.size && !this.state.running) || Number(value) === 1) {
            let list = generator(this.state.size);
            this.setState({ list: list });
        }
	};

    // chooses and runs the chosen sorting algorithms
    start = async() => {
        let startTime = performance.now();
        this.lock(true);
        let moves = await this.getMoves(this.state.algorithm);
        await this.visualizeMoves(moves);
        await this.done();
        let endTime = performance.now();
        executionTime = (`Execution Time: ${Math.round((endTime + Number.EPSILON) - (startTime + Number.EPSILON))/1000} seconds`);
        this.lock(false);
    };

    // tracks the moves for the sorting algorithms
    getMoves = async(Name) => {
        let moves = [];
        let array = await getKeysCopy(this.state.list, this.state.size);
        if(Name === 1) {
            moves = await bubbleSort(array, array.length);
        }
        if(Name === 2) {
            moves = await insertionSort(array, array.length);
        }
        if(Name === 3) {
            moves = await mergeSort(array, array.length);
        }
        if(Name === 4) {
            moves = await quickSort(array, array.length);
        }
        if(Name === 5) {
            moves = await heapSort(array, array.length);
        }
        return moves;
    };

    // displaying acquired moves
    visualizeMoves = async(moves) => {
        if(moves.length === 0) {
            return;
        }
        // handles range when the move length is 4
        if(moves[0].length === 4) {
            await this.visualizeMovesInRange(moves);
        }
        else {
            await this.visualizeMovesBySwapping(moves);
        }
    };

       // displaying of swapping based sorting algorithms
       visualizeMovesBySwapping = async(Moves) => {
        while(Moves.length > 0) {
            let currMove = Moves[0];
            // when the container does not have 3 elements, then return
            if(currMove.length !== 3) {
                await this.visualizeMoves(Moves);
                return;
            }
            else {
                let indexes = [currMove[0], currMove[1]];
                await this.updateElementClass(indexes, CURRENT);
                if(currMove[2] === SWAP) {
                    await this.updateList(indexes);
                }
                await this.updateElementClass(indexes, NORMAL);
            }
            Moves.shift();
        }
    };

    // displaying of range based sorting algorithms
    visualizeMovesInRange = async(Moves) => {
        let prevRange = [];
        while (Moves.length > 0 && Moves[0].length === 4) {
            // adjuest range when necessary to avoid blinking
            if(prevRange !== Moves[0][3]) {
                await this.updateElementClass(prevRange, NORMAL);
                prevRange = Moves[0][3];
                await this.updateElementClass(Moves[0][3], CURRENT);
            }
            await this.updateElementValue([Moves[0][0], Moves[0][1]]);
            Moves.shift();
        }
        await this.visualizeMoves(Moves);
    };

 

    // swapping the values of moves
    updateList = async(indexes) => {
        let array = [...this.state.list];
        let stored = array[indexes[0]].key;
        array[indexes[0]].key = array[indexes[1]].key;
        array[indexes[1]].key = stored;
        await this.updateStateChanges(array);
    };

    // Updates the state attribute list when there is a change
    updateStateChanges = async(newList) => {
        this.setState({list: newList});
        await pause(this.state.speed);
    };

    // changes the value of the element in the list
    updateElementValue = async(indexes) => {
        let array = [...this.state.list];
        array[indexes[0]].key = indexes[1];
        await this.updateStateChanges(array);
    };

    // changes the class type of the element in the list
    updateElementClass = async(indexes, classType) => {
        let array = [...this.state.list];
        for(let i = 0 ; i < indexes.length ; ++i) {
            array[indexes[i]].classType = classType;
        }
        await this.updateStateChanges(array);
    };

    

    // allows for the navbar to be responsive
    response = () => {
        let Navbar = document.querySelector(".navbar");
        if(Navbar.className === "navbar") Navbar.className += " responsive";
        else Navbar.className = "navbar";
    };

    // to prevent navbar options changes once the sorting algorithm has ran
    lock = (status) => {
        this.setState({ running: Boolean(status) });
    };

    // List is done
    done = async() => {
        let indexes = [];
        for(let i = 0 ; i < this.state.size ; ++i) {
            indexes.push(i);
        }
        await this.updateElementClass(indexes, DONE);
    };
    
    
}
 
export default Visualizer;