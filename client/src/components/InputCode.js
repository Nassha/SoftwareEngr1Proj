import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/InputCode.css'

const dump =`
a.push();
a.push().push();
a.dfs()().bc().pushBack();
abc.def.cd()
abc.def().cde.pushBack();
abc[].push()
abc.push(dec.push())
if(ab.pop())
`
// component for the input code section of the data structure visualizer
class InputCode extends Component {
  constructor() {
    super()
    this.code = `
    let tree = new std.SetTree();
data.Set_Tree_Keys.map(n => tree.insert(n));    
`
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.submit) {
      this.props.getCode(this.txtarea.value)
    }

    if(nextProps.sampleCode !== ``) {
      this.txtarea.value = nextProps.sampleCode;
    }
  }

  render() {
    return (
      <div className = 'code-write'>
        <textarea ref={input=>this.txtarea=input} className='code-write' spellCheck='false' wrap='off' defaultValue={this.code}>
        </textarea>
      </div>
    )
  }
}

InputCode.propTypes = {
  submit: PropTypes.bool,
  getCode: PropTypes.func,
  sampleCode: PropTypes.string
}

InputCode.defaultProps ={
  submit: false,
  getCode: f=>f,
  sampleCode: ``,
}

export default InputCode