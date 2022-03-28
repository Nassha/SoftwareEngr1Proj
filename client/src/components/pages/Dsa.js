import React, { Component } from 'react';
import ShowSection from '../ShowSection'
import InputSection from '../InputSection'
import '../../stylesheet/Dsa.css'
import sampleDatas from '../../data/testDatas'
import parsing from '../../data/parsing'

class Dsa extends Component {
  constructor() {
    super()
    this.sampleDatas =  sampleDatas
    const start = 0;
    this.state = {
      dataStates: [],
      executingCode: '',
      containerState: {object:'', method: '', params:[]},
      step: -1,
      // executingCode: sampleDatas[start].executingCode,
      // containerState: sampleDatas[start].containerState,
      // step: start,
      code: ``,
      data: {},
      submitStack: 0, // this is for stop the executing process now.
      stopShow: false,
      duration: '100',
      methodAnimation: true,
      specificData: {},
    }
  }

  getCode = (code) => {
    this.setState({
      dataStates: [],
      executingCode: '',
      containerState: {object:'', method: '', params:[]},
      code, 
      step: -1, 
      submitStack: this.state.submitStack+1,
      stopShow:false,
      methodAnimation: true,
    })
  }
  getData = (data) => {
    this.setState({
      dataStates: [],
      executingCode: '',
      containerState: {object:'', method: '', params:[]},
      data, 
      step: -1, 
      submitStack: this.state.submitStack+1,
      stopShow: false,
      methodAnimation: true,
    })
  }


  shouldComponentUpdate(nexpProps, nextState) {
    console.log(this.state.submitStack, nextState.submitStack)
    if((this.state.submitStack !== nextState.submitStack)) {
      console.log('call nextStep in update')
      this.sampleDatas = parsing({inputCode: nextState.code, inputData: nextState.data});
      console.log(this.sampleDatas)
      this.nextStep(nextState.submitStack, nextState);
      return false
    }
    return true 
  }

  nextStep = (submitStack, state = this.state) => {
    if (this.state.stopShow) {
      return;
    }
    
    const nextstep = state.step + 1
    const lastvalue = this.sampleDatas.length 
    console.log("stack: ",submitStack, state.submitStack)
    console.log("step: ", nextstep, lastvalue)
      
    if (submitStack === state.submitStack && nextstep < lastvalue) {
      this.setState({
        dataStates: this.sampleDatas[nextstep].dataStates,
        executingCode: this.sampleDatas[nextstep].executingCode,
        containerState: this.sampleDatas[nextstep].containerState,
        step: nextstep,
        methodAnimation: true,})
    } else if (submitStack === state.submitStack && nextstep === lastvalue) {
      this.setState({
        executingCode: '',
        containerState: {object:'', method: '', params:[]},
        code:``,
        data:{},
        step: -1,
        stopShow: false,
        methodAnimation: true,
      })
    }
  }

  changeStop = () => {
    this.setState({
      stopShow: !this.state.stopShow,
      methodAnimation: true,})
  }

  goMethod = (idx) => {
    this.setState({
      stopShow: !this.state.stopShow,
      dataStates: this.sampleDatas[idx].dataStates,
      executingCode: this.sampleDatas[idx].executingCode,
      containerState: this.sampleDatas[idx].containerState,
      step: idx,
      methodAnimation: true,
    })
  }

  changeDuration = (value) => {
    console.log('change duration: ', value)
    this.setState({
      duration: value,
      methodAnimation: true,
    });
  }

  showSpecificData = (data) => {
    this.setState({specificData:data, methodAnimation: false})
  }

  render() {
    return (
      <div className="App">
        <ShowSection specificData={this.state.specificData} showSpecificData={this.showSpecificData} methodAnimation={this.state.methodAnimation} goMethod={this.goMethod} methodList={this.sampleDatas.filter(n=>n.executingCode)} duration={this.state.duration} changeDuration={this.changeDuration} changeStop={this.changeStop} stopShow = {this.state.stopShow} step={this.state.step} submitStack={this.state.submitStack} nextStep={this.nextStep} dataStates={this.state.dataStates} executingCode = {this.state.executingCode} containerState={this.state.containerState}/>
        <InputSection getCode={this.getCode} getData={this.getData}/>
      </div>
    );
  }
}

export default Dsa;