<template>
<div class='ui-luckydog'>
	<div class='ld-title' v-if="luckydog.hasTitle">
		<span>往期中奖结果</span>
		<span id='ld-all' v-if="luckydog.hasAll" v-on:click.once="goLuckydogs">全部 ＞</span>
	</div>
	<div class='ld-item' v-for="ld in luckydog.luckydogs">
		<div class='ld-sub-title'>
			<div class='ld-tag'>
				<span class='idwrap'>第 <span class='stage'>{{ld.stage}}</span> 期</span>
			</div>
			<div class='ld-time'> {{ld.showWinTime}}开奖</div>
		</div>
		<div class='ld-row'>
			<div class='lucker'>中奖者：{{ld.phone}}</div>
			<div class='partno'>参与次数: {{ld.participateNum}}人次</div>
		</div>
		<div class='ld-no'>中奖夺宝券编号：{{ld.couponNo}}</div>
	</div>
</div>
</template>
<script src="./luckydog.js">
	// module.exports = {
	// 	name: "luckydog",
	// 	props: {
	// 		luckydog: Object
	// 	},
	// 	methods: {
	// 		goLuckydogs: function(){
	// 			this.$emit("goLdPage");//子组件出发事件goLdPage
	// 		}
	// 	}
	// }
</script>
<style lang="scss" scoped >
// pixels to rems 
@function pxToRem($px) {
  @return $px / 2 / 18.75px * 1rem;
}
.ui-luckydog{
	background: #e02a34;
	border-radius: 6px;
	margin: pxToRem(58px) pxToRem(20px) pxToRem(24px);
	.ld-title{
		font-size: pxToRem(30px);
		color: #fff;
		height: pxToRem(90px);
		line-height: pxToRem(90px);
		padding: 0 pxToRem(30px);
		position: relative;
		/*border-bottom: 1px solid #e5e5e5;*/
		&:after{
			content: '';
			display: block;
			position: absolute;
			left: -50%;
			width: 200%;
			height: 1px;
			background: #ededed;
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
		}
		#ld-all{
			float: right;
			color: #ccc;
		}
	}
	.ld-item{
		color: #fff;
		padding: pxToRem(40px) pxToRem(30px) 0 pxToRem(30px);
		/*border-bottom: 1px dashed #ededed;
		&:last-child{
			border-bottom: none;
		}*/
		position: relative;
		.ld-sub-title{
			position: relative;
			.ld-tag{			
				background: url(https://static.rong360.com/upload/png/af/37/af37087d610d617e8509f0443aee8e34.png) no-repeat center;
				background-size: 3.8rem pxToRem(68px);/*1pxToRem(20px)*/
			    display: inline-block;
			    width: 3.8rem;/*1pxToRem(20px)*/
			    height: pxToRem(68px);
			    line-height: pxToRem(68px);
			    margin-left: pxToRem(-40px);
				font-size: pxToRem(24px);
				position: relative;
				.idwrap{
					position: absolute;
					top: pxToRem(-8px);
					left: pxToRem(20px);
					.stage{
						font-size: pxToRem(34px);
					}
				}				
			}
			.ld-time{
				display: inline-block;
				position: absolute;
				top: pxToRem(10px);
				left: pxToRem(110px);
				color: #f66;
				font-size: pxToRem(30px);
			}
		}
		
		.ld-row{
			font-size: 0;
			width: 100%;
			margin: pxToRem(24px) 0 pxToRem(32px) 0;
			.lucker{
				display: inline-block;
				width: 55%;
				font-size: pxToRem(32px);
			}
			.partno{
				display: inline-block;
				width: 45%;
				font-size: pxToRem(32px);
			}		
		}
		.ld-no{
			padding-bottom: pxToRem(40px);
			font-size: pxToRem(32px);
		}
		&:after{
			content: '';
			display: block;
			position: absolute;
			left: -50%;
			width: 200%;
			height: 1px;
			border-bottom: 1px dashed #ededed;
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
		}
		&:last-child:after{
			display: none;
		}		
	}
}
</style>