var path = require('path')
var webpack = require('webpack')
// var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {bundle :'./src/index.jsx',
    vendor: ['react','react-dom','react-router-dom']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015','react']
        }
      }
    },
    {
      test: /\.png$/,
      use: 'file-loader'
    }]
  },
  devtool: 'false',
  plugins: [
    // new UglifyJsPlugin(),
    // 加入 html 模板任务
    new HtmlWebpackPlugin({
      // 模板文件
      template: 'src/index.html',
      // 打包后文件名称，会自动放到 output 指定的 dist 目录
      filename: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'vendor', 
      filename: 'vendor.js' 
    }),
  ]
}
