import React from 'react';
import Collapsible from '../functions/Collapsible.js';
import Dsa from './Dsa.js';
import SideCollapsible from '../functions/SideCollapsible.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function DataStructures(){
    return(
        <div className='DataStructures'>
            <div className='left-panel'>
            <SideCollapsible label = "Complexity ➤">
            <h1 style={{textAlign:"center"}}>Time Complexity</h1><br/>
            <h4 style={{textAlign:"center"}}>Doubly Linked List</h4><br/>
                      <table className='left-table'>
                          <tr>
                              <th>OPERATIONS</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Access</td>
                              <td>Θ(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Search</td>
                              <td>O(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Insertion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          <tr>
                              <td>Deletion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          
                          
                      </table><br/>
                      <h4 style={{textAlign:"center"}}>Queue</h4><br/>
                      <table className='left-table'>
                          <tr>
                              <th>OPERATIONS</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Access</td>
                              <td>Θ(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Search</td>
                              <td>O(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Insertion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          <tr>
                              <td>Deletion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          
                          
                      </table><br/>
                      <h4 style={{textAlign:"center"}}>Binary Tree</h4><br/>
                      <table className='left-table' >
                          <tr>
                              <th>OPERATIONS</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Access</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          <tr>
                              <td>Search</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          <tr>
                              <td>Insertion</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          <tr>
                              <td>Deletion</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          
                          
                      </table>
            
            </SideCollapsible>
            <SideCollapsible label='Code ➤'>
            <div className="TabBox">
            <Tabs style={{alignContent:"center",backgroundColor:" rgb(11,35,65, 0.9)" ,color:"white", textAlign:"justify", borderRadius:"7px",width:'120%',fontSize:'0.7rem',}}>
                <TabList>
                    <Tab>Linked List</Tab>
                    <Tab>Queue</Tab>
                    <Tab>Priority Queue</Tab>
                    <Tab>Tree</Tab>
                
                </TabList>

            <TabPanel style={{padding:"0px"}}>
                <code>
                    <pre>
{`
class Node {
    // constructor
    constructor(element) {
        this.element = element;
        this.next = null
    }
}
// linkedlist class
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
 
    // adds an element at the end
    // of list
    add(element) {
        // creates a new node
        var node = new Node(element);
 
        // to store current node
        var current;
 
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
 
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
 
            // add node
            current.next = node;
        }
        this.size++;
    }
 
    // insert element at the position index
    // of the list
    insertAt(element, index) {
        if (index < 0 || index > this.size)
            return console.log("Please enter 
            a valid index.");
        else {
            // creates a new node
            var node = new Node(element);
            var curr, prev;
 
            curr = this.head;
 
            // add the element to the
            // first index
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;
 
                // iterate over the list 
                // to find the position 
                // to insert
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // adding an element
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }
 
    // removes an element from the
    // specified location
    removeFrom(index) {
        if (index < 0 || index >= this.size)
            return console.log("Please Enter 
            a valid index");
        else {
            var curr, prev, it = 0;
            curr = this.head;
            prev = curr;
 
            // deleting first element
            if (index === 0) {
                this.head = curr.next;
            } else {
                // iterate over the list 
                // to the position to 
                // remove an element
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // remove the element
                prev.next = curr.next;
            }
            this.size--;
 
            // return the remove element
            return curr.element;
        }
    }
 
    // removes a given element from the
    // list
    removeElement(element) {
        var current = this.head;
        var prev = null;
 
        // iterate over the list
        while (current != null) {
            // comparing element with 
            // current element if found 
            // then remove the and 
            // return true
            if (current.element === element) 
            {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }
 
 
    // finds the index of element
    indexOf(element) {
        var count = 0;
        var current = this.head;
 
        // iterate over the list
        while (current != null) {
            // compare each element of 
            // the list with given element
            if (current.element === element)
                return count;
            count++;
            current = current.next;
        }
 
        // not found
        return -1;
    }
 
    // checks the list for empty
    isEmpty() {
        return this.size == 0;
    }
 
    // gives the size of the list
    size_of_list() {
        console.log(this.size);
    }
`}
                    </pre>
                </code>
            </TabPanel>
            <TabPanel style={{padding:"0px"}}>
            <code>
                <pre>
{`
class Queue {
    constructor() {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
    }
    enqueue(item) {
      this.items[this.tailIndex] = item;
      this.tailIndex++;
    }
    dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
    }
    peek() {
      return this.items[this.headIndex];
    }
    get length() {
      return this.tailIndex - this.headIndex;
    }
  }
`}
                </pre>
            </code>
            </TabPanel>
            <TabPanel style={{padding:"0px"}}>
                <code>
                    <pre>
{`
const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], 
        this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = 
    [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && 
        this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && 
      this._greater(left(node), node)) ||
      (right(node) < this.size() && 
      this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < 
      this.size() && 
      this._greater(right(node), 
      left(node))) ? right(node):left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
`}
                    </pre>
                </code>
            </TabPanel>
            <TabPanel style={{padding:"0px"}}>
                <code>
                    <pre>
{`
//General Tree

function Node(value) {

    this.value = value;
    this.children = [];
    this.parent = null;

    this.setParentNode = function(node) {
        this.parent = node;
    }

    this.getParentNode = function() {
        return this.parent;
    }

    this.addChild = function(node) {
    node.setParentNode(this);
    this.children[this.children.length]=node;
    }

    this.getChildren = function() {
        return this.children;
    }

    this.removeChildren = function() {
        this.children = [];
    }
}

var root = new Node('root');
root.addChild(new Node('child 0'));
root.addChild(new Node('child 1'));
var children = root.getChildren();
for(var i = 0; i < children.length; i++) {
    for(var j = 0; j < 5; j++) {
        children[i].addChild(new Node(
            'second level child ' + j));
    }
}
console.log(root);
children[0].removeChildren();
console.log(root);
console.log(root.getParentNode());
console.log(children[1].getParentNode());

//Red & Black Tree

const RED = true;
const BLACK = false;
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = RED;
    }
}
class RBT {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    isRed(node) {
        if (!node) return BLACK;
        return node.color;
    }
    // Left right red left black
    leftRotate(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // Right rotation left red left sub red
    rightRoate(node) {
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // Color reversal
    flipColors(node) {
        node.color = RED;
        node.left.color = BLACK;
        node.right.color = BLACK;
    }
    add(key, value) {
        this.root = this.addRoot(this.root,
             key, value);
        this.root.color = BLACK; 
        // Root node is always black
    }
    addRoot(node, key, value) {
        if (!node) {
            this.size++;
            return new Node(key, value);
        }
        if (key < node.key) {
        node.left = this.addRoot(node.left, 
                key, value);
        } else if (key > node.key) {
        node.right = this.addRoot(node.right, 
                key, value);
        } else {
            node.value = value;
        }
        if (this.isRed(node.right) && 
        !this.isRed((node.left))) {
            node = this.leftRotate(node);
        }
        if (this.isRed(node.left) && 
        this.isRed((node.left.left))) {
            node = this.rightRoate(node);
        }
        if (this.isRed(node.left) && 
        this.isRed(node.right)) {
            this.flipColors(node);
        }
        return node;
    }
    isEmpty() {
        return this.size == 0 ? true : false;
    }
    getSize() {
        return this.size;
    }
    contains(key) {
        let ans = '';
        !(function getNode(node, key) {
            if (!node || key == node.key) {
                ans = node;
                return node;
            } else if (key > node.key) {
            return getNode(node.right, key);
            } else {
            return getNode(node.right, key);
            }
        })(this.root, key);
        return !!ans;
    }
    // bst preamble traversal 
    (recursive version)
    preOrder(node = this.root) {
        if (node == null) return;
        console.log(node.key);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    preOrderNR() {
        if (this.root == null) return;
        let stack = [];
        stack.push(this.root);
        while (stack.length > 0) {
            let curNode = stack.pop();
            console.log(curNode.key);
            if (curNode.right != null) 
                stack.push(curNode.right);
            if (curNode.left != null) 
                curNode.push(curNode.left);
        }
    }
    // bst middle order traversal
    inOrder(node = this.root) {
        if (node == null) return;
        this.inOrder(node.left);
        console.log(node.key);
        this.inOrder(node.right);
    }
    // bst subsequent traversal
    postOrder(node = this.root) {
        if (node == null) return;
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.key);
    }
    // The way of bsf + queue to 
    // realize hierarchical traversal
    generateDepthString1() {
        let queue = [];
        queue.unshift(this.root);
        while (queue.length > 0) {
        let tmpqueue = []; let ans = [];
        queue.forEach(item => {
            ans.push(item.key);
        item.left ? 
        tmpqueue.push(item.left):'';
        item.right ? 
        tmpqueue.push(item.right):'';
        });
        console.log(...ans);
        queue = tmpqueue;
        }
    }
    minmun(node = this.root) {
        if (node.left == null) return node;
        return this.minmun(node.left);
    }
    maximum(node = this.root) {
        if (node.right == null) return node;
        return this.maximum(node.right);
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
            <div className='DSleft'>
                <Dsa />
            </div>
            <div className='DSright'>
            <Collapsible label="Linked List">
                        <h1>Linked List</h1>
                        <p>A linked list is a <font className="ideatext">linear</font> data structure that includes a series of <font className="ideatext">connected nodes</font>. Here, each node stores the data and the address of the next node.Linked lists can be of multiple types: singly, doubly, and circular linked list.
                        </p>
                        <h1>Applications</h1>
                        <p><ol style={{marginLeft:"10px"}}><li>Dynamic memory allocation</li><li>Implemented in stack and queue</li><li>In undo functionality of softwares</li><li>Hash tables, Graphs</li></ol></p>
            </Collapsible>
            <Collapsible label="Queue">
                        <h1>Queue</h1>
                        <p> A queue is a useful data structure in programming. It is similar to the ticket queue outside a cinema hall, where the first person entering the queue is the first person who gets the ticket.Queue follows the <font className="ideatext">First In First Out</font> (FIFO) rule - the item that goes in first is the item that comes out first.
                        </p>
                        <h1>Priority Queue</h1>
                        <p>A priority queue is a special type of queue in which <font className="ideatext">each element is associated with a priority value</font>. And, elements are served on the basis of their priority. That is, higher priority elements are served first.However, if elements with the same priority occur, they are served according to their order in the queue.</p>
            </Collapsible>
            <Collapsible label="Tree">
                        <h1>Tree</h1>
                        <p>A tree is a <font className="ideatext">nonlinear</font> hierarchical data structure that consists of nodes <font className="ideatext">connected by edges</font>. Different tree data structures allow quicker and easier access to the data as it is a non-linear data structure.
                        </p>
                        <h1>Applications</h1>
                        <p>
<ol style={{marginLeft:"10px"}}><li> Binary Search Trees(BSTs) are used to quickly check whether an element is present in a set or not.</li>
<li> Heap is a kind of tree that is used for heap sort.</li>
<li> A modified version of a tree called Tries is used in modern routers to store routing information.</li>
<li> Most popular databases use B-Trees and T-Trees, which are variants of the tree structure we learned above to store their data</li>
<li> Compilers use a syntax tree to validate the syntax of every program you write.</li>
</ol>
                        </p>
                       
            </Collapsible>
            </div>
        </div>
    );
}