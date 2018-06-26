import React, { Component } from 'react'
import iScroll from 'iscroll/build/iscroll-probe'
import './index.css'
import Item from '../Item'

class List extends Component {
  constructor () {
    super()
    this.state = {
      pullDownStatus: 1,
      pullUpStatus: 0
    }
    this.isTouch = false
    this.pullDownTips = {
      // 下拉状态
      1: '继续下拉刷新',
      2: '松手即可刷新',
      3: '正在刷新',
      4: '刷新成功'
    }
    this.pullUpTips = {
      // 上拉状态
      0: '上拉发起加载',
      1: '松手即可加载',
      2: '正在加载'
    }
    this.onScroll = this.onScroll.bind(this)
    this.onScrollEnd = this.onScrollEnd.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
  }
  onTouchStart () {
    this.isTouch = true
  }
  onTouchEnd () {
    this.isTouch = false
  }
  // 手势
  onPullDown () {
    if (!this.isTouch) return
    if (this.scroll.y > 0) {
      this.state.pullDownStatus !== 2 && this.setState({pullDownStatus: 2})
    } else {
      this.state.pullDownStatus !== 1 && this.setState({pullDownStatus: 1})
    }
  }
  // 手势
  onPullUp () {
    if (!this.isTouch) return
    if (this.scroll.y <= this.scroll.maxScrollY + 5) {
      this.state.pullUpStatus !== 1 && this.setState({pullUpStatus: 1})
    } else {
      this.state.pullUpStatus !== 0 && this.setState({pullUpStatus: 0})
    }
  }
  onScroll () {
    let high = this.refs.PullDown.offsetHeight
    // 上拉区域
    if (this.scroll.y > -high) {
      this.onPullDown()
    } else {
      this.state.pullDownStatus !== 1 && this.setState({pullDownStatus: 1})
      // 下拉区域
      if (this.scroll.y <= this.scroll.maxScrollY + 5) this.onPullUp()
    }
  }
  onScrollEnd () {
    let high = this.refs.PullDown.offsetHeight
    // 滑动结束后，停在刷新区域
    if (this.scroll.y > -high) {
      if (this.state.pullDownStatus <= 1) { // 没有发起刷新,那么弹回去
        this.scroll.scrollTo(0, -high, 1000)
      } else if (this.state.pullDownStatus === 2) { // 发起了刷新,那么更新状态
        this.setState({pullDownStatus: 3})
        console.log('刷新')
        this.props.Refresh()
      }
    }
    // 滑动结束后，停在加载区域
    if (this.scroll.y <= this.scroll.maxScrollY) {
      if (this.state.pullUpStatus === 1) { // 发起了加载，那么更新状态
        this.setState({pullUpStatus: 2})
        console.log('加载')
        this.props.More()
      }
    }
  }
  clickDetail (id) {
    this.props.clickDetail(id)
  }
  render () {
    let todos = this.props.arr || []
    return (
      <main className='content-list'
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}>
        <div className='scroll-list' ref='scroll'>
          <p id='pulldown' ref='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>
          {todos.map((item, index) => {
            return <Item item={item} key={index} type={this.props.type} detail={this.props.detailOpen} ind={index} />
          })}
          <p id='pullup' ref='PullUp'>{this.pullUpTips[this.state.pullUpStatus]}</p>
        </div>
      </main>
    )
  }
  componentDidUpdate () {
    this.scroll.refresh()
    if (this.state.pullDownStatus === 3) {
      this.setState({pullDownStatus: 4, pullUpStatus: 0})
      let high = this.refs.PullDown.offsetHeight
      let scroll = this.scroll
      let that = this
      setTimeout(function () {
        scroll.scrollTo(0, -high, 200)
        that.setState({pullDownStatus: 1})
      }, 500)
    }
    if (this.state.pullUpStatus === 2) {
      this.setState({pullUpStatus: 0})
    }
  }
  componentDidMount () {
    let options = {
      mouseWheel: true,
      probeType: 3,
      zoom: true,
      interactiveScrollbars: true,
      startY: -22,
      preventDefault: false
    }
    this.scroll = new iScroll('.content-list', options)
    this.scroll.on('scroll', this.onScroll)
    this.scroll.on('scrollEnd', this.onScrollEnd)
  }
}
export default List
