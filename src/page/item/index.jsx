import React, { Component } from 'react'

import './index.css'

class Item extends Component {
  constructor () {
    super()
    this.state = {

    }
  }

  handlerDetail (evt) {
    this.props.detail(this.props.ind)
  }

  render () {
    const item = this.props.item
    const type = this.props.type
    if (item.tags) {
      var tags = item.tags.slice(0, 3)
    } else { var tags = item.genres }

    let img = item.image || item.allimg.small
    let imgpage = {
      backgroundSize: '100% 100%',
      backgroundImage: `url(${img})`
    }
    switch (type) {
      case 'book':
        return (
          <div className='item' onClick={this.handlerDetail.bind(this)}>
            <div className='item-pic' style={imgpage} />
            <div className='item-detail'>
              <p className='item-text'>名称：{item.title}</p>
              <ul className='tag-book'>
                {tags.map((item, i) => {
                  return (<li key={i}>{item.name}</li>)
                })}
              </ul>
              <p className='item-text'>作者：{item.author}</p>
              <p className='item-text'>评分：{item.rating}</p>
              <p className='item-text'>时间：{item.pubdate}</p>
            </div>
          </div>
        )
        break
      case 'music':
        return (
          <div className='item' onClick={this.handlerDetail.bind(this)}>
            <div className='item-pic' style={imgpage} />
            <div className='item-detail'>
              <p className='item-text'>名称：{item.title}</p>
              <ul className='author'><p className='item-text'>作者：
              {item.author.map((item, i) => {
                return (<li key={i}>{item.name}</li>)
              })}
              </p></ul>
              <p className='item-text'>评分：{item.rating}</p>
            </div>
          </div>
        )
        break
      case 'movie':
        return (
          <div className='item' onClick={this.handlerDetail.bind(this)}>
            <div className='item-pic' style={imgpage} />
            <div className='item-detail'>
              <p className='item-text'>{item.title + ' - ' + item.year}</p>
              <ul className='tag-movie'>
                {item.genres.map((item, i) => {
                  return (<li key={i}>{item}</li>)
                })}
              </ul>
              <ul className='author'><p className='item-text'>
                {tags.map((item, i) => {
                  return (<li key={i}>{item.name}</li>)
                })}
              </p></ul>
              <p className='item-text'>评分：{item.rating}</p>
            </div>
          </div>
        )
        break
    }
  }
}

export default Item
