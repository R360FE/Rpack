// webpack.config.js
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//create multiple instances
const appCss = new ExtractTextPlugin({
    filename: "/styles/app.css",//[name],[id],[contentHash]
});
const compCss = new ExtractTextPlugin({
    filename: "/styles/components.css",//[name],[id],[contentHash]
});

module.exports = {
  entry: {
    "app": ["./router/router.js"], 
    // "component": ["./component/actitem.js","./component/luckydog.js"], 
    "vendor":["./lib/zepto.js","vue","vue-router","./util/util.js"],
  },
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js",
      publicPath: '/static/webapp/rui/m_duobao',
      chunkFilename: "[name].js",
  },
  module: {
    rules: [
      /*================================================*/
      /*=============组件里的样式抽取=====================*/
      /*================================================*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: /component/,
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            //不需要抽取*.vue里的样式时如下配置：
            // 'scss': 'vue-style-loader!css-loader!sass-loader',
            // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            //抽取*.vue里的样式如下配置：
            scss: compCss.extract({
              use: [{
                loader:'css-loader',
                options:{
                  minimize:false
                }
              },"sass-loader"],
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
            
          },
        }
      },
      /*================================================*/
      /*=============views里的样式抽取=====================*/
      /*================================================*/
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
        include: /view/,
        options: {
          loaders: {
            scss: appCss.extract({
              // use: "css-loader!sass-loader",
              use: [{
                loader: 'css-loader',
                options: {
                  minimize: false
                }
              },"sass-loader"],
              fallback: "vue-style-loader"
            })
          }
        }
      }
    ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor'],
          fielname: '[name].[hash].js',
          // chunks: ['vendor']   //增加这个类库就打包不到一起了，表示抽取entry.vendor公共代码
      }),
      appCss,
      compCss,
      // new webpack.optimize.UglifyJsPlugin(),//使用uglifyJsPlugin就不能使用一些简写了，对语法校验严格了

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'vue-router$': 'vue-router/dist/vue-router.common.js'
    }
  },
  // devtool: "source-map",//CSS SourceMap (with devtool: "source-map" and extract-text-webpack-plugin?sourceMap)
  devServer:{
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    // port: 8080, //默认8080
    // colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }
}