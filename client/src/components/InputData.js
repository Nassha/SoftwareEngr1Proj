import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/InputData.css'

// component for inputting values into the data structure visualizer
class InputData extends Component {
  constructor() {
    super()
    var arr = [];
    while(arr.length < 5){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    this.inputData = `{
  Set_Tree_Keys:[`+arr+`]
}`
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.submit) {
      this.props.getData(this.txtarea.value)
    }
    if (nextProps.sampleData !== ``) {
      this.txtarea.value = nextProps.sampleData;
    }
  }
  render() {
    return (
      <textarea ref={input=>this.txtarea=input} className='input-data' wrap='off' spellCheck='false' defaultValue={this.inputData}>
      </textarea>
    )
  }
}

InputData.propTypes = {
  getData: PropTypes.func
}

InputData.defaultProps ={
  getData: f=>f
}

export default InputData