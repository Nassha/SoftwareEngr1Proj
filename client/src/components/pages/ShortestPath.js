import React from 'react';
import PathfindingVisualizer from '../pathFindingVisualizer/PathfindingVisualizer'
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import arrow from '../images/arrow.png';

export default function ShortestPath(){
    return(
        <div className='ShortestPath'>
            <div className='left-panel'>
            
            <SideCollapsible label = "Complexity ➤"  >
            <h1 style={{textAlign:"center"}}>Shortest Path Algorithms</h1><br/>
            <h3 style={{textAlign:"center"}}>Complexity</h3><br/>
                      <table className='left-table'>
                          <tr>
                              <th>AGORITHM</th>
                              <th>Time Complexity</th>
                              <th>Space Complexity</th>
                          </tr>
                          <tr>
                              <td>Dijkstra</td>
                              <td>O((|V| + |E|) log V)</td>
                              <td>O(|V| + |E|)</td>
                          </tr>
                          <tr>
                              <td>Breadth First Search</td>
                              <td>O(V+E)</td>
                              <td>O(l), l is no. of node in single level</td>
                          </tr>
                          <tr>
                              <td>Depth First Search</td>
                              <td>O(V+E)</td>
                              <td>O(h), h is max height</td>
                          </tr>
                          
                      </table>
            </SideCollapsible>
            <SideCollapsible label='Code ➤'>
            <div className="TabBox">
            <Tabs style={{alignContent:"center",backgroundColor:" rgb(11,35,65, 0.9)" ,color:"white", textAlign:"justify", borderRadius:"7px",width:"100%"}}>
                <TabList>
                    <Tab>Dijkstra</Tab>
                    <Tab>Breadth First Search</Tab>
                    <Tab>Depth First Search</Tab>
                
                </TabList>

            <TabPanel style={{padding:"5px"}}>
                <code>
                    <pre>
{`
djikstraAlgorithm(startNode) {
    let distances = {};
 
    //Stores the reference to previous nodes
    let prev = {};
    let pq = new PriorityQueue(this.nodes
        .length * this.nodes.length);
 
    // Set distances to all nodes to be 
    // infinite except startNode
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);
    this.nodes.forEach(node => {
       if (node !== startNode) {
           distances[node] = Infinity;
           prev[node] = null;
        }
    });
 
    while (!pq.isEmpty()) {
       let minNode = pq.dequeue();
       let currNode = minNode.data;
       let weight = minNode.priority;
       this.edges[currNode].forEach(neighbor 
        => {let alt = distances[currNode] 
          + neighbor.weight;
        if (alt < distances[neighbor.node]) 
          {
             distances[neighbor.node] = alt;
             prev[neighbor.node] = currNode;
             pq.enqueue(neighbor.node, 
                distances[neighbor.node]);
          }
       });
    }
    return distances;
 }
`}
                    </pre>
                </code>
            </TabPanel>
            <TabPanel style={{padding:"5px"}}>
                <code>
                    <pre>
{`
BFS(node) {
    // Create a Queue and add 
    // our initial node in it
    let q = new Queue(this.nodes.length);
    let explored = new Set();
    q.enqueue(node);
 
    // Mark the first node as 
    // explored explored.
    add(node);
 
    // We'll continue till our 
    // queue gets empty
    while (!q.isEmpty()) {
       let t = q.dequeue();
 
       // Log every element that comes 
       // out of the Queue
       console.log(t);
 
       // 1. In the edges object, we search  
       // for nodes this node is directly 
       // connected to.
       // 2. We filter out the nodes that 
       // have already been explored.
       // 3. Then we mark each unexplored 
       // node as explored and add it to 
       // the queue.
       this.edges[t]
       .filter(n => !explored.has(n))
       .forEach(n => {
          explored.add(n);
          q.enqueue(n);
       });
    }
 }
`}
                    </pre>
                </code>
            </TabPanel>
            <TabPanel style={{padding:"5px"}}>
                <code>
                    <pre>
{`
DFS(node) {
    // Create a Stack and add our initial 
    // node in it
    let s = new Stack(this.nodes.length);
    let explored = new Set();
    s.push(node);
 
    // Mark the first node as explored
    explored.add(node);
 
    // We'll continue till our Stack
    // gets empty
    while (!s.isEmpty()) {
       let t = s.pop();
 
    // Log every element that comes 
    // out of the Stack
       console.log(t);
 
    // 1. In the edges object, we search for
    // nodes this node is directly 
    // connected to.
    // 2. We filter out the nodes that have
    // already been explored.
    // 3. Then we mark each unexplored node 
    // as explored and push it to the Stack.
    this.edges[t]
    .filter(n => !explored.has(n))
    .forEach(n => {
       explored.add(n);
       s.push(n);
       });
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
                <PathfindingVisualizer />
               
            </div>
            <div className='right'>
            <Collapsible label="Dijkstra's Algorithm Information">
                        <h1>Dijkstra's Algorithm</h1>
                        <p>Dijkstra's algorithm allows us to find the <font className="ideatext">shortest path</font> between any two vertices of a graph.It differs from the minimum spanning tree because the shortest distance between two vertices <font className="ideatext">might not include all the vertices</font> of the graph.
                        </p>
            </Collapsible>
            <Collapsible label="Breadth First Search Algorithm Information">
                        <h1>Breadth First Search</h1>
                        <p> BFS is a <font className="ideatext">traversing algorithm</font> where you should start traversing from a selected node (source or starting node) and traverse the graph layerwise thus exploring the neighbour nodes (nodes which are directly connected to source node). You must then move towards the next-level neighbour nodes.
As the name BFS suggests, you are required to <font className="ideatext">traverse the graph breadthwise</font> as follows:
1.First move horizontally and visit all the nodes of the current layer2.Move to the next layer
                        </p>
            </Collapsible>
            <Collapsible label="Depth First Search Algorithm Information">
                        <h1>Depth First Search</h1>
                        <p>The DFS algorithm is a <font className="ideatext">recursive algorithm</font> that uses the idea of backtracking. It involves exhaustive searches of all the nodes by going ahead, if possible, else by backtracking.
                        Here, the word backtrack means that when you are moving forward and there are no more nodes along the current path, you move backwards on the same path to find nodes to traverse. <font className="ideatext">All the nodes will be visited on the current path</font> till all the unvisited nodes have been traversed after which the next path will be selected. 

                        </p>
                      
            </Collapsible>
            
            </div>
        </div>
    );
}