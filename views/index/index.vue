<template>
	<div class="index-wrap">
  		<actitem :stage="stage" :nextTime="nextTime" :showWinTime="showWinTime" :currentCoupon="currentCoupon" :sumCoupon="sumCoupon" :status="status"></actitem>
  		<luckydog :luckydog="dogs" v-on:goLdPage="goLdPage"></luckydog>
  	</div>
</template>

<script>
  var actitem = require('../../component/actitem.vue');
  var luckydog = require("../../component/luckydog.vue");

  module.exports = {
  	components: {
  		actitem: actitem,
  		luckydog: luckydog
  	},
  	data: function(){
      return $.extend(CONST.currentInfo,{
                dogs:{
                  hasTitle: true,
                  hasAll: true,
                  luckydogs: this.$store.state.luckydogs
                }   
              });
    },
    methods: {
      goLdPage: function(){
        this.$router.push({ path: '/luckydogs', query: { linkurl: "go 404 page" }})
      }
    }
   	// props: ["stage","nextTime","showWinTime","currentCoupon","sumCoupon","status"],
  }
</script>
<style lang="scss"> 
  *{
    padding: 0;
    margin: 0;
    font-family: "Microsoft Yahi";
  }
  body{
    background: #f4f4f4;
  }
  .index-wrap{
    padding-top: 0.1rem;
  }
</style>