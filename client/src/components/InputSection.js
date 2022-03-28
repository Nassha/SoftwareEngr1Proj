import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputCode from './InputCode'
import InputData from './InputData'
import SampleCode from './SampleCode'
import '../stylesheet/InputSection.css'

// component for holding the different components contained within the input section of the data structure visualizer
class InputSection extends Component {
  constructor() {
    super()
    this.state = {
      submit:false,
      showCaution: false,
      sampleCode: ``,
      sampleData: ``,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.sampleCode !== ``) {
      return true;
    }
    const {submit, showCaution} = this.state;
    return (!submit && nextState.submit) || (showCaution !== nextState.showCaution)
  }

  componentDidUpdate() {
    if (this.state.submit) {
      this.setState({
        submit: false,
        sampleCode: ``,
        sampleData: ``,})
    } else {
      this.setState({
        sampleCode: ``,
        sampleData: ``
      })
    }
  }

  changeShow = () => {
    console.log('click')
    this.setState({showCaution: !this.state.showCaution})
  }

  render() {
    return (
      <section className='input-section'>
        <div className='text-input1'>Write Code</div>
        {/* <button className='precaution' onClick={this.changeShow}><img className='cautionImg' src={require('../public/caution.png')} alt='caution'/></button> */}
        <button className='input-button' onClick={input => this.setState({submit: true})}>INITIALIZE</button>
        <SampleCode changeSample = {(code, data) => this.setState({sampleCode: code, sampleData: data})}/>
        <InputCode submit={this.state.submit} getCode={this.props.getCode} sampleCode = {this.state.sampleCode}/>
        <div className='text-input2'>INPUT DATA</div>
        <InputData submit={this.state.submit} getData={this.props.getData} sampleData = {this.state.sampleData}/>
        {(this.state.showCaution)?
        <div className='coverDom'>
        </div>
        :null}
      </section>
    )
  }
}

InputSection.propTypes = {
  getCode: PropTypes.func,
  getData: PropTypes.func,
  inputdata: PropTypes.object
}

InputSection.defaultProps = {
  getCode: f=>f,
  getData: f=>f
}

export default InputSection