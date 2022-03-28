import React, { Children } from 'react';

import Visualizer from './sortingVisualizer.jsx';
import './sorting.css';
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



export default function Sorting(){
    return (
        <div className='Sorting'>
            <div className='left-panel'>
            <SideCollapsible label = "Complexity ➤">
            <h1 style={{textAlign:"center"}}>Sorting Algorithms</h1><br/>
            <h3 style={{textAlign:"center"}}>Big O Time Complexity</h3><br/>
                      <table className='left-table'>
                          <tr>
                              <th>AGORITHM</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Bubble Sort</td>
                              <td>Ω(n)</td>
                              <td>O(n^2)</td>
                          </tr>
                          <tr>
                              <td>Quick Sort</td>
                              <td>Ω(n log(n))</td>
                              <td>O(n^2)</td>
                          </tr>
                          <tr>
                              <td>Merge Sort</td>
                              <td>Ω(n log(n))</td>
                              <td>O(n log(n))</td>
                          </tr>
                          <tr>
                              <td>Insertion Sort</td>
                              <td>Ω(n)</td>
                              <td>O(n^2)</td>
                          </tr>
                          <tr>
                              <td>Heap Sort</td>
                              <td>Ω(n log(n))</td>
                              <td>O(n log(n))</td>
                          </tr>
                          
                      </table>
            </SideCollapsible>
            <SideCollapsible label='Code ➤'>
            <div className="TabBox">
            <Tabs style={{fontSize:'0.75rem',backgroundColor:" rgb(11,35,65, 0.9)" ,color:"white", textAlign:"justify", borderRadius:"7px",width:"100%"}}>
                <TabList>
                    <Tab>Bubble</Tab>
                    <Tab>Insertion</Tab>
                    <Tab>Merge</Tab>
                    <Tab>Quick</Tab>
                    <Tab>Heap</Tab>
                </TabList>

            <TabPanel style={{padding:"10px"}}>
            <code>
                <pre>
{`
function swap(arr, xp, yp)
    {
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }
    
    
    function bubbleSort( arr, n)
    {
    var i, j;
    for (i = 0; i < n-1; i++)
    {
        for (j = 0; j < n-i-1; j++)
        {
            if (arr[j] > arr[j+1])
                {
                swap(arr,j,j+1);
                }
        }
    
    }
    }
`}
                    </pre>
            </code>
            </TabPanel>
            <TabPanel style={{padding:"10px"}}>
                    <code>
                        <pre>
{`
function insertionSort(arr, n) 
{ 
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
        
        /* Move elements of arr[0..i-1], 
        that are greater than key, to 
        one position ahead of their 
        current position */

        while (j >= 0 && arr[j] > key)
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    } 
} 
`}
                        </pre>
                    </code>
            </TabPanel>
            <TabPanel style={{padding:"10px"}}>
                <code>
                    <pre>
{`
function merge(left, right) {
    let arr = []
    /*Break out of loop if any one 
    of the array gets empty*/
    while (left.length && right.length) {
        /*Pick the smaller among the 
        smallest element of left and 
        right sub arrays*/
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    /*Concatenating the leftover elements
    (in case we didn't go through the 
    entire left or right array)*/
    return [ ...arr, ...left, ...right ]
}

function mergeSort(array) {
    const half = array.length / 2
    
    // Base case or terminating case
    if(array.length < 2){
        return array 
    }
    
    const left = array.splice(0, half)
    return merge(mergeSort(left),
    mergeSort(array))
    }
`}
                    </pre>
                </code>
            </TabPanel>
            <TabPanel style={{padding:"10px"}}>
                <code>
                    <pre>
{`
function quick_Sort(origArray) {
    if (origArray.length <= 1) { 
        return origArray;
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = origArray.pop();
        var length = origArray.length;

        for (var i = 0; i < length; i++) {
            if (origArray[i] <= pivot) {
                left.push(origArray[i]);
            } else {
                right.push(origArray[i]);
            }
        }

        return newArray.concat(
        quick_Sort(left), 
        pivot, quick_Sort(right)
        );
    }
}

`}
                    </pre>
                </code>
            </TabPanel>
            <TabPanel style={{padding:"10px"}}>
            <code>
                <pre>
{`
function sort( arr)
{
    var n = arr.length;

    // Build heap (rearrange array)
    for (var i = Math.floor(n / 2)
        - 1; i >= 0; i--)
        heapify(arr, n, i);

    // One by one extract an
    // element from heap
    for (var i = n - 1; i > 0; i--) {
        // Move current root to end
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // call max heapify on 
        // the reduced heap
        heapify(arr, i, 0);
    }
}

// To heapify a subtree rooted 
// with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, n, i)
{
    var largest = i; // Initialize 
                    // largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest])
        largest = l;

    // If right child is 
    // larger than largest so far
    if (r < n && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        // Recursively heapify 
        // the affected sub-tree
        heapify(arr, n, largest);
    }
}

`}
                </pre>
            </code>   
            </TabPanel>
        </Tabs>
            </div>
        </SideCollapsible>
            </div>
                <div className='left'>
                    <Visualizer />
                </div>
                <div className='right'>
                    <Collapsible label="Bubble Sort Information">
                        <h1>Bubble Sort</h1>
                        <p>Bubble sort is a sorting algorithm that <font className="ideatext">compares two adjacent elements</font> and swaps them until they are not in the intended order.
Just like the movement of air bubbles in the water that rise up to the surface, each element of the array move to the end in each iteration. 
Therefore, it is called a bubble sort.
                        </p>
                    </Collapsible>
                    <Collapsible label="Insertion Sort Information">
                        <h1>Insertion Sort</h1>
                        <p>
                        Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually <font className="ideatext">split into a sorted and an unsorted part</font>. 
                        Values from the unsorted part are picked and placed at the correct position in the sorted part.
                        </p>
                    </Collapsible>
                    <Collapsible label="Merge Sort Information">
                        <h1>Merge Sort</h1>
                        <p>
                        Like QuickSort, Merge Sort is a <font className="ideatext">Divide and Conquer</font> algorithm. 
                        It divides the input array into <font className="ideatext">two halves</font>, calls itself for the two halves, and then merges the two sorted halves.
                        </p>
                    </Collapsible>
                    <Collapsible label="Quick Sort Information">
                        <h1>Quick Sort</h1>
                        <p>
                        QuickSort is a <font className="ideatext">Divide and Conquer</font> algorithm. It picks an element as <font className="ideatext">pivot and partitions the given array</font> around the picked pivot. 
                        </p>
                    </Collapsible>
                    <Collapsible label="Heap Sort Information">
                        <h1>Heap Sort</h1>
                        <p>Heap sort is a <font className="ideatext">comparison-based sorting technique</font> based on Binary Heap data structure. 
                            It is similar to selection sort where we first <font className="ideatext">find the minimum element</font> and place the minimum element at the beginning. 
         
                        </p>
                    </Collapsible>
                </div>
        </div>
      );
} 