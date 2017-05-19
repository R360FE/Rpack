# Rpack

## 如何使用

1) npm install -g webpack

2) 将项目下载到本地，执行npm install,安装依赖

3) 切换到项目目录执行 
* 开发模式：npm run dev 
* 生产模式：npm run build

4) 访问
* http://localhost:8080/page/index.html

## webpack配置说明

1) 将单文件组件里的样式抽取单独打包，ExtractTextPlugin

2) 将依赖类库单独打包 CommonsChunkPlugin

3) 单文件组件编译使用vue-loader， 样式编译使用style-loader!css-loader!sass-loader(自右向左)

4) js压缩使用UglifyJsPlugin,单组件文件抽取后的css压缩需使用css-loader，给css-loader加配置选项

5) HtmlWebpackPlugin自动引入编译后的静态资源

6) 热更新
* The easiest way to use Hot Module Replacement with the webpack-dev-server is to use the inline mode.

>* webpack.config.js 里配置 devServer{inline:true}
>* webpack-dev-server 命令行加 --inline --hot
>* 执行命令后，访问http://localhost:8080/page/index.html, 当有修改后，页面会自动刷新

7) 拷贝到远程机器

* 使用scp进行拷贝，可以设置免密拷贝，不需要输入密码
* 需要拷贝时，将webpack.config.js里最后的注释放开就可以

## vuejs相关

* 例子中使用了 vue-router 来做路由管理，组件文件里面有父子组件事件通信及数据传输例子
* vuex来管理状态
* component下为通用组件，并注册为全局组件,单独打包js及css
* widget目录下为异步组件，在index.vue有使用
