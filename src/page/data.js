import fetchJsonp from 'fetch-jsonp'
// 各页面数据保存
let data = {
  type: {
    books: [],
    movies: [],
    musics: []
  },
  search:{
    book: '阿西莫夫',
    movie: '长泽雅美',
    music: '陈绮贞'
  },
  // 获取数据
  async fetch (value, e, i) {
    let arry = []
    let start = 10 * i
    await fetchJsonp('https://api.douban.com/v2/' + e + '/search?q=' + value + '&start=' + start + '&count=10')
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        let alldata = json.books || json.subjects || json.musics
        alldata.forEach((item) => {
          let obj = {
            title: item.title, // 名称
            tags: item.tags, // 标签
            author: item.author, // 图书作者
            rating: item.rating.average, // 评分
            pubdate: item.pubdate, // 发行日期
            genres: item.genres, // 电影标签
            casts: item.casts, // 主演 演员照片url   casts[0].avatars.small
            year: item.year, // 电影发行年份
            allimg: item.images,
            image: item.image, // 音乐图片
            bookpub: item.publisher, // 发行商
            bookprice: item.price, // 图书价格
            catalog: item.catalog, // 序言
            summary: item.summary, // 简介
            directors: item.directors, // 电影导演 directors[0].name
            oriname: item.original_title, // 电影原名 oriname
            musicattrs: item.attrs
            // 音乐发布商 musicattrs.publisher[0]
            // 音乐发布时间 musicattrs.pubdate[] arr
            // 音乐内容 musicattrs.tracks[]
          }
          arry.push(obj)
        })
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
    return arry
  },
  // 点击搜索首次加载数据
  async onSubmit (value, e) {
    var value = value.replace(/(^\s*)|(\s*$)/g, '')
    let arry = await this.fetch(value, e, 0)
    switch (e) {
      case 'book':
        this.type.books = arry
        this.search.book = value
        break
      case 'music':
        this.type.musics = arry
        this.search.music = value
        break
      case 'movie':
        this.type.movies = arry
        this.search.movie = value
        break
    }
  },
  // 上拉加载更多
  async More (value, e, i) {
    let arry = await this.fetch(value, e, i)
    switch (e) {
      case 'book':
        this.type.books = this.type.books.concat(arry)
        break
      case 'music':
        this.type.musics = this.type.musics.concat(arry)
        break
      case 'movie':
        this.type.movies = this.type.movies.concat(arry)
        break
    }
  }
}

export default data
