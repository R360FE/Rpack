<template>
	<div class="luckydogs-wrap">
		<a class="link" href="javascript:;" v-on:click="go404">{{$route.query.linkurl}}</a>
		<a href="javascript:;" class="link" v-on:click="goIndex">回首页</a>
  		<luckydog :luckydog="dogs"></luckydog>
	</div>
</template>

<script>
  var luckydog = require('../../component/luckydog.vue');

  module.exports = {
  	components: {
  		luckydog: luckydog
  	},
  	data: function(){
  		return {
  			dogs: $.extend({hasTitle:true,hasAll: false},{luckydogs: CONST.luckydogs})
  		}
  	},
  	methods: {
  		go404: function(){
  			this.$router.push({path:"/notfound"});
  		},
  		goIndex: function(){
  			this.$router.go(-1);
  		}
  	}
	// props: ["dogs"],
	// watch: {
	// 	//复用组件时，对路由参数的变化作出响应，监控$route变化，因为复用，生命周期函数钩子不会再调用，在生命周期做的事情可以放在这里
	//     '$route': function (to, from) {
	//       // 对路由变化作出响应...
	//       console.log("from: " + JSON.stringify(from) + " ,to: " + JSON.stringify(to));
	//     }
	// }
  }
</script>
<style lang="scss"> 
	.luckydogs-wrap{
		.link{
			color: #36c;
			text-align: center;
		}
	}
</style>