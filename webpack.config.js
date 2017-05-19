// webpack.config.js
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

// var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var scp = require("./util/scp.js");

//create multiple instances
const appCss = new ExtractTextPlugin({
    filename: "css/app.css",//[name],[id],[contentHash]
});
const compCss = new ExtractTextPlugin({
    filename: "css/components.css",//[name],[id],[contentHash]
});
const widgetCss = new ExtractTextPlugin({
    filename: "css/widget.css",//[name],[id],[contentHash]
});

module.exports = {
  entry: {
    "js/app": ["./app.js"],
    "js/vendor":["./lib/zepto.js","vue","vue-router","vuex","./util/util.js"],
    "js/components": ["./component/index.js"]//["./component/actitem/index.js","./component/luckydog/index.js"]
  },
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js",
      chunkFilename: "js/[name].js",
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
        loaders: 'vue-loader',
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
              // use: [{
              //   loader: 'css-loader',
              //   options: {
              //     minimize: false
              //   }
              // },"sass-loader"],
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
              fallback: "vue-style-loader"
            })
          }
        }
      },
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
        include: /widget/,
        options: {
          loaders: {
            scss: widgetCss.extract({
              use: "css-loader!sass-loader",
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
            
          },
        }
      },
    ]
  },
  plugins: [
      new DashboardPlugin(dashboard.setData),
      // new FriendlyErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
          names: ['js/vendor','js/components'],//
          filename: "[name].js"
      }),
      compCss,
      appCss,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new HtmlWebpackPlugin({
        title: "a project for webpack+vuejs",
        filename: "index.html",
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
    extensions: ['.js', '.vue', '.json'],
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

