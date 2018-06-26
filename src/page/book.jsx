import React, { Component } from 'react'
import Input from './input'
import List from './list'
import data from './data'
import Detail from './detail'
import './style.css'

class Book extends Component {
  constructor () {
    super()
    // 增加用于保存待办事项的数组
    this.state = {
      type: 'book',
      arr: data.type.books,
      Detail: null,
      info: data.search.book,
      page: 1
    }
  }
  async onSubmit (e) {
    await data.onSubmit(e, 'book')
    this.setState({
      arr: data.type.books,
      info: data.search.book,
      page: 1
    })
  }
  async More () {
    await data.More(this.state.info, 'book', this.state.page)
    let index = this.state.page + 1
    this.setState({
      arr: data.type.books,
      page: index
    })
  }
  async Refresh () {
    await data.onSubmit(this.state.info, 'book')
    this.setState({
      arr: data.type.books,
      page: 1
    })
  }
  componentDidMount () {
    if (this.state.arr == '') { this.onSubmit('阿西莫夫') }
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
      <div className='book'>
        <Input onSubmit={this.onSubmit.bind(this)} value={this.state.info}/>
        <List arr={this.state.arr} type={'book'} More={this.More.bind(this)}
          Refresh={this.Refresh.bind(this)} detailOpen={this.detailOpen.bind(this)} />
        <Detail Detail={this.state.Detail} type={'book'} closeDetail={this.closeDetail.bind(this)} />
      </div>
    )
  }
}

module.exports = Book
