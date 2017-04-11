// webpack.config.js
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var scp = require("./util/scp.js");

//create multiple instances
const appCss = new ExtractTextPlugin({
    filename: "assets/app.css",//[name],[id],[contentHash]
});
const compCss = new ExtractTextPlugin({
    filename: "assets/components.css",//[name],[id],[contentHash]
});

module.exports = {
  entry: {
    "js/app": ["./router/router.js"], 
    "js/component": ["./component/actitem.js","./component/luckydog.js"], 
    "js/vendor":["./lib/zepto.js","vue","vue-router","vuex","./util/util.js"],
  },
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js",
      chunkFilename: "[name].js",
  },
  module: {
    rules: [
      /*================================================*/
      /*=============避免低级错误和统一代码的风格===========*/
      /*可以IDE里使用eslint插件，开发过程中及时发现问题，不用等到编译时发现问题*/
      /*================================================*/
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [/util/,/component/,/router/],
        exclude: [/node_modules/],
        enforce: "pre"
      },
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
              use: "css-loader!sass-loader",
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
              use: "css-loader!sass-loader",
              // use: [{
              //   loader: 'css-loader',
              //   options: {
              //     minimize: false
              //   }
              // },"sass-loader"],
              fallback: "vue-style-loader"
            })
          }
        }
      },
    ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          names: ['js/vendor'],
      }),
      appCss,
      compCss,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new HtmlWebpackPlugin({
        title: "a project for webpack+vuejs",
        filename: "page/index.html",
        template: "./page/index.html",
        // xhtml: true,  // 需要符合xhtml的标准
        // minify: {
        //   collapseWhitespace:false,
        //   removeComments: true,
        //   // minifyJS: true
        // }
      })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'vue-router$': 'vue-router/dist/vue-router.common.js',
      'vuex$': "vuex/dist/vuex.js"
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

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = "/static/webapp/rui/m_rpack";
  // module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

/******************************************************/
/****************拷贝到远程机器**************************/
/******************************************************/
/*先注释掉，要拷贝时放开*/
/*
module.exports.plugins = (module.exports.plugins || []).concat([
  function() {
    this.plugin('done', function(stats) {
      scp.send({
        file: './dist/',
        host: 'testhost',
        user: 'test',
        path: '~/yydist/'
      }, function () {

      });
    });
  }
])
*/

