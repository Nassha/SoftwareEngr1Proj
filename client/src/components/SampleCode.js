import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/SampleCode.css'

// component that allows for sample code to be performed within the data structure visualizer
class SampleCode extends Component {
  arr = null;

  generateArray = (size) => {
    var arr = [];
    while(arr.length < size){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  settreedata = `{
  Set_Tree_Keys:[`+this.generateArray(5)+`]
}`
  settreecode = `let tree = new std.SetTree();
data.Set_Tree_Keys.map(n => tree.insert(n));
`
  
  maptreedata = `{
    Map_Tree_Keys:[`+this.generateArray(5)+`]
}`
  maptreecode = `let tree = new std.MapTree();
data.Map_Tree_Keys.map(
  n=>tree.insert(n, 'number' + n.toString())
);
`

  listdata = `{
    Doubly_Linked_List:[`+this.generateArray(5)+`]
}`
  listcode = `let li = new std.List();
data.Doubly_Linked_List.map(d => li.pushBack(d));
[1,1,1].map(x => li.popFront());
data.Doubly_Linked_List.map(n => li.pushFront(n));
[1,1,1].map(x => li.popBack());
`
  
  queuedata = `{
  Queue_base:[`+this.generateArray(3)+`],
  Queue_push:[`+this.generateArray(5)+`]
}`
  queuecode = `let qu = new std.Queue(data.Queue_base);
data.Queue_push.map(d => qu.push(d));
[1,1,1].map(n=>qu.pop());
`
  
  pqdata = `{
    Priority_Queue:[`+this.generateArray(5)+`]
}`
  pqcode = `let pq = new std.PriorityQueue();
data.Priority_Queue.map(d => pq.push(d));
[1,1,1,1,1].map(k => pq.pop());
`

  closeButton = () => {
    this.setState({open: !this.state.open})
  }
  clickButton = (code, data) => {
    this.props.changeSample(code, data);
    this.closeButton();
  }

  render() {
    return (
      <div className='samplecode'>
        <button className='samplecodebutton' onClick={this.closeButton}>Select Data Structure</button>
        {(this.state.open)?
          <div className='coverDom2'>
            <div className='changecodecontent'>
              <button className='gosample' onClick={() => this.clickButton(this.settreecode, this.settreedata)}>SetTree</button>
              <button className='gosample' onClick={() => this.clickButton(this.maptreecode, this.maptreedata)}>MapTree</button>
              <button className='gosample' onClick={() => this.clickButton(this.listcode, this.listdata)}>List</button>
              <button className='gosample' onClick={() => this.clickButton(this.queuecode, this.queuedata)}>Queue</button>
              <button className='gosample' onClick={() => this.clickButton(this.pqcode, this.pqdata)}>Priority Queue</button>
              <button className='closeshowdata' onClick={this.closeButton}>CLOSE</button>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

SampleCode.propTypes = {
  changeSample : PropTypes.func
}

SampleCode.defaultProps = {
  changeSample: f=>f
}

export default SampleCode;