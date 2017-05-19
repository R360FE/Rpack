<template>
	<div class="luckydogs-wrap">
      <div class="navbar">
        <a class="link" href="javascript:;" v-on:click="goNested">{{$route.query.linkurl}}</a>
        <a href="javascript:;" class="link" v-on:click="goIndex">回首页</a>
      </div>
		
  		<luckydog :luckydog="dogs"></luckydog>

      <div class="btngroup">
        <div class="btn remove" @click="removeLd">删除幸运儿</div>
        <div class="btn add" @click="addLd">增加幸运儿</div>
      </div>
	</div>
</template>

<script>
  // var luckydog = require('../../component/luckydog/luckydog.vue');

  module.exports = {
  	// components: {
  	// 	luckydog: luckydog
  	// },
  	data: function(){
  		return {
        dogs: $.extend({
          hasTitle: true,
          hasAll: false
        },{
          luckydogs: this.$store.state.luckydogs
        })
  		}
  	},
  	methods: {
  		goNested: function(){
  			this.$router.push({path:"/nested"});
  		},
  		goIndex: function(){
  			// this.$router.go(-1);
        this.$router.push({path:"/"});
  		},
      removeLd: function(){
        this.$store.commit("removeLuckydog");
      },
      addLd: function(){
        this.$store.commit("addLuckydog");
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
    .navbar{
      display: -webkit-box;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      background: #f6c;
      .link{
        -webkit-box-flex: 1;
        text-decoration: none;
        display: inline-block;
        width: 7rem;
        height: 3rem;
        color: #070808;
        background: #af7fa3;
        line-height: 3rem;
      }
    }
    .btngroup{
      margin: 1rem 0.533333rem;
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      .btn{
        color: #fff;
        text-align: center;
        border-radius: 10px;
        background: #f9993c;
        box-shadow: 0 4px #f07d38;
        height: 3rem;
        line-height: 3rem;
        -webkit-box-flex: 1;
        margin: 0 1rem;
      }
    }
		
	}
</style>