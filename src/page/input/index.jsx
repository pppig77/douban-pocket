import React, { Component } from 'react'
import iconimg from './lupita.png'
import './index.css'

var sectionStyle = {
  backgroundImage: `url(${iconimg})`
}

class Input extends Component {
  clickUp (event) {
    const value = this.refs.input.value
    if (value) {
      // 调用回调
      this.props.onSubmit(value)
    }
  }
  handlerKeyUp(event){
    if(event.keyCode === 13){
      let value = event.target.value;
      if (value) {
      // 调用回调
      this.props.onSubmit(value)
      }
    }
  }
  render () {
    return (
      <div className='input-container'>
        <span className='search-icon' style={sectionStyle} />
        <input ref='input' defaultValue={this.props.value} onKeyUp={this.handlerKeyUp.bind(this)}/>
        <button onClick={this.clickUp.bind(this)}>查询
        </button>
      </div>
    )
  }
}

export default Input
