var Vue = require("vue");
var router = require("./router");
var store = require("./store");

var component = require("./component");

//创建和挂载根实例
var app = new Vue({
	router: router,
	store: store
}).$mount("#app");

