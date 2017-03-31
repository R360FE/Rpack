
var Vue = require("vue");
var VueRouter = require("vue-router");
var Vuex = require("vuex");
Vue.use(VueRouter);
Vue.use(Vuex);

//路由组件
var index = require("../views/index/index.vue");
var luckydogs = require("../views/luckydogs/luckydogs.vue");
var result = require("../views/result/result.vue");
var notfound = require("../views/notfound/notfound.vue");

//定义路由，每个路由映射一个组件
var routes = [{
	path: "/", component: index
},{
	path: "/luckydogs", component: luckydogs
},{
	path: "/result", component: result
},{
	path: "*", component: notfound
}];

//创建路由实例，然后传‘routes’配置
var router = new VueRouter({
	routes: routes
});

//创建一个store
var createNumArray = window.Utils.createNumArray;
var store = new Vuex.Store({
	state: {
		diffTime: 20000000, //开奖倒计时
		luckydogs: window.CONST.luckydogs,
		nextStage: 6
	},
	getters: {
		getTime: function(state){
			return window.Utils.getTime(state.diffTime);
		}
	},
	mutations: {
		decreaseTm: function(state){
			state.diffTime-=100;
		},
		addLuckydog: function(state){
			var ld = {
				stage: state.nextStage++,
				showWinTime: createNumArray(4).join("")+"/"+"0"+createNumArray(1)+"/"+createNumArray(2),
				phone: "1"+createNumArray(2).join("")+"****"+createNumArray(4).join(""),
				participateNum: Math.round(Math.random()*100),
				couponNo: createNumArray(6).join("")
			};
			state.luckydogs.push(ld);
		},
		removeLuckydog: function(state){
			state.nextStage--;
			state.luckydogs.pop();
		}
	},
	actions: {

	},
	modules: {
		
	}
})

//创建和挂载根实例
var app = new Vue({
	router: router,
	store: store
}).$mount("#app");



/*===============================================================*/
/*=================以下代码是没使用路由时的组件实例化，代码可能需要修改=================*/
/*===============================================================*/

// new Vue({
// 	el: "#app",
// 	components: {
// 		index: index
// 	},
// 	render: function(createElement){
// 		return createElement("index",{
// 			props:{
// 				nextTime: "20420/09/30",
// 				showWinTime: "20420/09/18",
// 				currentCoupon: "2400",
// 				sumCoupon: "14000",
// 				stage: 344,
// 				status: 24
// 			}
// 		});
// 	}
// })

// new Vue({
// 	el: "#sec",
// 	components: {
// 		luckydogs: luckydogs
// 	},
// 	render: function(createElement){
// 		return createElement("luckydogs",{
// 			props: {
// 				dogs: {
// 					hasTitle: false,
// 					hasAll: false,
// 					luckydogs: [{
// 						stage: 1,
// 						showWinTime: "2020/09/09",
// 						phone: "131****2345",
// 						participateNum: 200,
// 						couponNo: 11
// 					},{
// 						stage: 2,
// 						showWinTime: "2020/09/10",
// 						phone: "132****2345",
// 						participateNum: 200,
// 						couponNo: 12
// 					},{
// 						stage: 3,
// 						showWinTime: "2020/09/11",
// 						phone: "133****2345",
// 						participateNum: 200,
// 						couponNo: 13
// 					},{
// 						stage: 4,
// 						showWinTime: "2020/09/12",
// 						phone: "134****2345",
// 						participateNum: 200,
// 						couponNo: 14
// 					},{
// 						stage: 5,
// 						showWinTime: "2020/09/13",
// 						phone: "135****2345",
// 						participateNum: 200,
// 						couponNo: 15
// 					}]
// 				}
// 			}
// 		})
// 	}
// })




