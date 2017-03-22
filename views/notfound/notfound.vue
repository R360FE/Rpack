<template>
	<div class="notfound">
		<div class="title">404</div>
		<h3>很抱歉，页面走丢了</h3>
		<a href="javascript:;" class="link" v-on:click="goIndex">回首页</a>
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		methods: {
			goIndex: function(){
				this.$router.push({path:"/"});
			}
		}
	}

</script>
<style lang="scss">
	.notfound{
		text-align: center;
		.title{
			font-size: 4rem;
			color: #333;
			font-weight: bold;
			margin: 2rem;
			text-shadow: 2px 2px 4px #69c;
		}
		h3{
			margin: 3rem auto;
		}
		.link{
			text-align: center;
			margin: 1rem;
		}
	}
</style>
