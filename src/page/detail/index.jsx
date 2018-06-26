import React, { Component } from 'react'
import './style.css'

class Detail extends Component {
  handlerClose () {
    this.props.closeDetail()
  }

  render () {
    const data = this.props.Detail
    const type = this.props.type
    if (!data) { return null }
    if (data.tags) {
      var tags = data.tags.slice(0, 3)
    } else { var tags = data.genres }
    if(data.title.length>15){
      var defaultTitle = data.title.substr(0,12)+'...';
    }else{var defaultTitle = data.title}
    let img = data.image || data.allimg.small || ''
    let imgpage = {
      backgroundSize: '100% 100%',
      backgroundImage: `url(${img})`
    }

    switch (type) {
      case 'book':
        return (
          <div className='detail'>
            <div className='detail-top'>
              <span className='back' onClick={this.handlerClose.bind(this)}>&lt;</span>
              <span>{defaultTitle}</span>
            </div>
            <div className='detail-contain'>
              <div className='top-outer'>
                <div className='left-img'>
                  <div className='item-pic' style={imgpage} />
                </div>
                <div className='top-inner'>
                  <p>名称：{data.title}</p>
                  <p>作者：{data.author}</p>
                  <p>出版社：{data.bookpub}</p>
                  <p>日期：{data.pubdate}</p>
                  <p>评分：{data.rating}</p>
                  <p>价格：{data.bookprice}</p>
                  <ul className='tag tag-book'>类型：
                    {tags.map((item, i) => {
                      return (<li key={i}>{item.name}</li>)
                    })}
                  </ul>
                </div>
              </div>
              <div className='bottom-outer'>
                <div>
                  <h2>序言</h2>
                  <p>{data.catalog}</p>
                </div>
                <div>
                  <h2>简介</h2>
                  <p>{data.summary}</p>
                </div>
              </div>
            </div>
          </div>
        )
        break
      case 'music':
        return (
          <div className='detail'>
            <div className='detail-top'>
              <span className='back' onClick={this.handlerClose.bind(this)}>&lt;</span>
              <span>{defaultTitle}</span>
            </div>
            <div className='detail-contain'>
              <div className='top-outer'>
                <div className='left-img'>
                  <div className='item-pic' style={imgpage} />
                </div>
                <div className='top-inner'>
                  <p>名称：{data.title}</p>
                  <p>作者：{data.author[0].name}</p>
                  <p>发布商：{data.musicattrs.publisher}</p>
                  <p>发布时间：{data.musicattrs.pubdate}</p>
                  <p>评分：{data.rating}</p>
                </div>
              </div>
              <div className='bottom-outer'>
                <div>
                  <h2>简介</h2>
                  <p>{data.musicattrs.version}</p>
                </div>
                <div>
                  <h2>内容</h2>
                  <p>{data.musicattrs.tracks}</p>
                </div>
              </div>

            </div>
          </div>
        )
        break
      case 'movie':

        let castimg = []
        data.casts.forEach((item, i) => {
          if (item.avatars) {
            let pic = item.avatars.small || item.avatars.middle || item.avatars.large || ''
            let style = {
              backgroundSize: '100% 100%',
              backgroundImage: `url(${pic})`
            }
            castimg.push(<span style={style} key={i} />)
          }
        })
        let largepage = {}
        if (data.allimg) {
          let largeimg = data.allimg.large || data.allimg.middle || data.allimg.small || ''
          largepage = {
            backgroundSize: '100% 100%',
            backgroundImage: `url(${largeimg})`
          }
        }
        if (!data.directors.length) data.directors = [{name: '未知'}]
        return (

          <div className='detail'>
            <div className='detail-top'>
              <span className='back' onClick={this.handlerClose.bind(this)}>&lt;</span>
              <span>{defaultTitle}</span>
            </div>
            <div className='detail-contain'>
              <div className='top-movie'>
                <div className='poster' style={imgpage} />
              </div>
              <div className='bottom-movie'>
                <div className='bottom-outer'>
                  <h2>简介</h2>
                  <div>
                    <p>名称：{data.title}({data.oriname})</p>
                    <ul className='tag tag-movie'>类型：
                      {tags.map((item, i) => {
                        return (<li key={i}>{item}</li>)
                      })}
                    </ul>
                    <p>上映时间：{data.year}</p>
                    <p>导演：{data.directors[0].name}</p>
                  </div>
                </div>
                <div className='bottom-img'>
                  <h2>演员</h2>
                  <div className='cast-img'>
                    {castimg}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        break
    }
  }
}

export default Detail
