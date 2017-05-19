var Vue = require("vue");
var Vuex = require("vuex");

Vue.use(Vuex);

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
});

module.exports = store;