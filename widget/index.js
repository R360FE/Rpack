var Vue = require("vue");

//定义异步组件
var async1 = Vue.component('async1', function (resolve) {
    require(['./async1/async1.vue'], resolve)
});
var async2 = Vue.component('async2', function (resolve) {
    require(['./async2/async2.vue'], resolve)
});

//创建简单工厂模式，获取异步组件
var fr = window.Utils.getQuery("from");
var indexComponent;
switch(fr){
  case "async2":
    indexComponent = async2;
    break;
  default:
    indexComponent = async1;
}

module.exports = indexComponent;