<template>
	<div class="nested-wrap">
    <div class="desc">这是测试动态组件的页面</div>
    <component v-for="cp in cps" :is="cp" :luckydog="dogs" :stage="stage" :nextTime="nextTime" :showWinTime="showWinTime" :currentCoupon="currentCoupon" :sumCoupon="sumCoupon" :status="status" v-on:goLdPage="goLdPage"></component>
      
  </div>
</template>

<script>
  module.exports = {
    data: function(){
      return $.extend(CONST.currentInfo,{
                dogs:{
                  hasTitle: true,
                  hasAll: true,
                  luckydogs: this.$store.state.luckydogs
                }   
              },
              {
                cps:['actitem','luckydog']
              });
    },
    methods: {
      goLdPage: function(){
        this.$router.push({ path: '/luckydogs', query: { linkurl: "组件页" }})
      }
    }
  }
</script>
<style lang="scss"> 
  .desc{
    height: 5rem;
    line-height: 5rem;
    font-size: 1.0666667rem;
    color: #36c;
    text-align: center;
    background: #928859;
  }
</style>