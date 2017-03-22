# Rpack

##如何使用

1) npm install -g webpack

2) 将项目下载到本地，执行npm install,安装依赖

3) 切换到项目目录执行 webpack

4) 打开page/index.html可以看到效果

##webpack配置说明

1) 将单文件组件里的样式抽取单独打包，ExtractTextPlugin

2) 将依赖类库单独打包 CommonsChunkPlugin

3) 单文件组件编译使用vue-loader， 样式编译使用style-loader!css-loader!sass-loader(自右向左)

4) js压缩使用UglifyJsPlugin,单组件文件抽取后的css压缩需使用css-loader，给css-loader加配置选项

##vuejs相关

例子中使用了 vue-router 来做路由管理，组件文件里面有父子组件事件通信及数据传输例子

##暂时未做的

1) 单文件组件里的js单独打包
2) 开发模式和生产模式
3) 热更新
4) sourcemap
5) webpack-dev-server直接开服务打开index.html
6) 丰富例子，加上vuex
