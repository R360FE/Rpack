<template>
<div class="ui-actItem">
	<div class="act-0">
		<span class='fz-34'>第{{stage}}期夺宝&ensp;</span>
		<span class='fz-24 cblue' v-if="status==0">未开始</span>
		<span class='fz-24 cblue' v-else-if="status==1">进行中...</span>
		<span class='fz-24 cblue' v-else-if="status==2">待开奖</span>
		<span class='fz-24 cblue' v-else>已结束</span>
		<span class='fz-24 cred next' v-if="(status==2||status==3) && nextTime">下期{{nextTime}}开始</span>
	</div>
	<div class="act-1">
		<div class="row1"></div>
		<div class="row2">
			<div class="start"><div class="l-start"><span class="fz-24 cgrey">开奖时间：</span><span class="fz-24 cblue">{{showWinTime}}</span></div><div class="r-start"><span class="fz-30">倒计时</span></div></div>
			<div class="timer cred">
				<div class="hours fz-48">{{dtm.hours}}</div>
				<div class="seprator fz-48">:</div>
				<div class="minutes fz-48">{{dtm.minutes}}</div>
				<div class="seprator fz-48">:</div>
				<div class='seconds fz-48'>{{dtm.seconds}}</div>
			</div>
			<div class="fz-22 cgrey">集齐1000份开奖哦</div>
		</div>
	</div>
	<div class='act-2'>
		<div class='process' v-bind:style="{width: pwidth +'%'}"></div>
	</div>
	<div class='act-3'>
		<div class='d1'>已参加{{currentCoupon}}份</div>
		<div class="d2">余<span class="cdred">{{ sumCoupon-currentCoupon }}</span>份</div>
	</div>
	<div class="joinbtn" v-if="status==2 || status==3 || currentCoupon==1000" v-on:click="goParticipate">
	{{status==3 ? "本期已结束" : (status==2 ? "本期已满 坐等下期" : "去夺宝") }}
	</div>
	<div class="tjy" v-if="status==2 || currentCoupon==1000">
		<p class="goLoans full">开奖等不及，快速获取1000元 ＞</p>
	</div>
    <slot name='nested'></slot>
</div>
</template>
<script src="./actitem.js"></script>
<style lang="scss" scoped >
// pixels to rems 
@function pxToRem($px) {
  @return $px / 2 / 18.75px * 1rem;
}
.ui-actItem{
    background: #efefef;
    margin: pxToRem(20px);
    padding-bottom: pxToRem(30px);
    border-radius: 6px;
    .fz-34{
        font-size: pxToRem(34px);
    }
    .fz-24{
        font-size: pxToRem(24px);
    }
    .fz-30{
        font-size: pxToRem(30px);
    }
    .fz-48{
        font-size: pxToRem(48px);
    }
    .fz-22{
        font-size: pxToRem(22px);
    }
    .cblue{
        color: #36c;
    }
    .cred{
        color: #f66;
    }
    .cgrey{
        color: #666;
    }
    .cdred{
        color: #c66;
    }
    .act-0{
        padding: 0rem pxToRem(30px);
        border-bottom: 1px solid #e5e5e5;
        span{
            display: inline-block;
            height: pxToRem(68px);
            line-height: pxToRem(68px);
            &.next{
                float: right;
            }
        }
    }
    .act-1{
        margin: pxToRem(20px) pxToRem(30px) pxToRem(16px) pxToRem(30px);
        display: -webkit-box;
        display: box;
        -webkit-box-align: center;
        .row1{
            background: url(https://static.rong360.com/upload/png/e5/3e/e53e2a3ac7c555cb5f3ee5f6560061d7.png) no-repeat;
            background-size: pxToRem(146px) pxToRem(188px);
            width: pxToRem(146px);
            height: pxToRem(188px);
        }
        .row2{
            text-align: right;
            -webkit-box-flex: 1;
            .start{
                width: pxToRem(488px);
                display: inline-block;
                height: pxToRem(32px);
                line-height: pxToRem(32px);
                position: relative;
                .l-start{
                    position: absolute;
                    left: 0;
                }
                .r-start{
                    position: absolute;
                    right: 0;
                }
            }
            .timer{
                font-size: 0;
                margin: pxToRem(24px) 0 pxToRem(40px) 0;
                .seprator{
                    display: inline-block;
                    width: pxToRem(48px);
                    text-align: center;
                }
                .hours,.minutes,.seconds{
                    display: inline-block;
                    height: pxToRem(90px);
                    line-height: pxToRem(90px);
                    text-align: center;                
                    width: pxToRem(118px);
                    background: #f4f4f4;
                    border-radius: 6px;
                    border: 1px solid #d3d3d3;                
                }
                .seconds{
                    width: pxToRem(144px);
                }
            }
        }     
    }
    .act-2{
        margin: pxToRem(8px) pxToRem(30px) pxToRem(16px) pxToRem(30px);
        position: relative;
        border-radius: 8px;
        height: pxToRem(20px);
        background: #ccc;
        .process{
            position: absolute;
            top: 0;
            left: 0;
            height: pxToRem(20px);
            border-radius: 8px;
            background: #f9993c;
        }
    }
    .act-3{
        font-size: pxToRem(32px);
        margin: pxToRem(16px) pxToRem(30px) pxToRem(24px) pxToRem(30px);
        display: -webkit-box;
        display: box;
        -webkit-box-align: center;
        .d1{
            -webkit-box-flex: 1;
            color: #666;
        }
        .d2{
            -webkit-box-flex: 1;
            text-align: right;
        }
    }
    .joinbtn{
        margin: pxToRem(24px) pxToRem(30px) pxToRem(30px) pxToRem(30px);
        height: pxToRem(90px);
        line-height: pxToRem(90px);
        color: #fff;
        text-align: center;
        font-size: pxToRem(32px);
        border-radius: 4px;
        background: #f9993c;
        box-shadow: 0 4px #f07d38;
        &.end{
            background: #b9b9b9;
            color: #fff;
            box-shadow: 0 4px #9c9c9c;
        }
    }
    .tjy{
        font-size: pxToRem(32px);
        color: #ff9933;
        text-align: right;
        padding: 4px pxToRem(30px) 0 0;
    }
}
</style>