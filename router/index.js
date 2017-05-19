var Vue = require("vue");
var VueRouter = require("vue-router");

Vue.use(VueRouter);

//路由组件
var index = require("../views/index/index.vue");
var luckydogs = require("../views/luckydogs/luckydogs.vue");
var nested = require("../views/nested/nested.vue");
var notfound = require("../views/notfound/notfound.vue");


//定义路由，每个路由映射一个组件
var routes = [{
	path: "/", component: index
},{
	path: "/luckydogs", component: luckydogs
},{
	path: "/nested", component: nested //父组件-子组件-孙子组件
},{
	path: "*", component: notfound
}];

//创建路由实例，然后传‘routes’配置
var router = new VueRouter({
	// mode: 'history',
	routes: routes
});

module.exports = router;