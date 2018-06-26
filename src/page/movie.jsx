import React, { Component } from 'react'
import Input from './input'
import List from './list'
import data from './data'
import Detail from './detail'
import './style.css'

class Movie extends Component {
  constructor () {
    super()
    // 增加用于保存待办事项的数组
    this.state = {
      type: 'movie',
      arr: data.type.movies,
      Detail: null,
      info: data.search.movie,
      page: 1
    }
  }
  async onSubmit (e) {
    await data.onSubmit(e, 'movie')
    this.setState({
      arr: data.type.movies,
      info: data.search.movie,
      page: 1
    })
  }
  async More () {
    await data.More(this.state.info, 'movie', this.state.page)
    let index = this.state.page + 1
    this.setState({
      arr: data.type.movies,
      page: index
    })
  }
  async Refresh () {
    await data.onSubmit(this.state.info, 'movie')
    this.setState({
      arr: data.type.movies,
      page: 1
    })
  }
  componentDidMount () {
    if (this.state.arr == '') { this.onSubmit('长泽雅美') }
  }
  /*
     *详情
     */
  // 打开
  detailOpen (key) {
    console.log(key)
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
      <div className='movie'>
        <Input onSubmit={this.onSubmit.bind(this)} value={this.state.info}/>
        <List arr={this.state.arr} type={'movie'} More={this.More.bind(this)}
          Refresh={this.Refresh.bind(this)} detailOpen={this.detailOpen.bind(this)} />
        <Detail Detail={this.state.Detail} type={'movie'} closeDetail={this.closeDetail.bind(this)} />
      </div>
    )
  }
}

module.exports = Movie
