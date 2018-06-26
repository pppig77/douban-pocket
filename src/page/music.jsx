import React, { Component } from 'react'
import Input from './input'
import List from './list'
import data from './data'
import Detail from './detail'
import './style.css'

class Music extends Component {
  constructor () {
    super()
    // 增加用于保存待办事项的数组
    this.state = {
      type: 'music',
      arr: data.type.musics,
      Detail: null,
      info: data.search.music,
      page: 1
    }
  }
  async onSubmit (e) {
    await data.onSubmit(e, 'music')
    this.setState({
      arr: data.type.musics,
      info: data.search.music,
      page: 1
    })
  }
  async More () {
    await data.More(this.state.info, 'music', this.state.page)
    let index = this.state.page + 1
    this.setState({
      arr: data.type.musics,
      page: index
    })
  }
  async Refresh () {
    await data.onSubmit(this.state.info, 'music')
    this.setState({
      arr: data.type.musics,
      page: 1
    })
  }
  componentDidMount () {
    if (this.state.arr == '') { this.onSubmit('陈绮贞') }
  }
  /*
     *详情
     */
  // 打开
  detailOpen (key) {
    this.setState({
      Detail: this.state.arr[key]
    })
  }
  // 关闭
  closeDetail () {
    this.setState({
      Detail: null
    })
  }
  render () {
    return (
      <div className='music'>
        <Input onSubmit={this.onSubmit.bind(this)} value={this.state.info}/>
        <List arr={this.state.arr} type={'music'} More={this.More.bind(this)}
          Refresh={this.Refresh.bind(this)} detailOpen={this.detailOpen.bind(this)} />
        <Detail Detail={this.state.Detail} type={'music'} closeDetail={this.closeDetail.bind(this)} />
      </div>
    )
  }
}

module.exports = Music
