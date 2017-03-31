<template>
	<div class="resultwrap">
    <canvas id='canvas' width='640' height='480'></canvas>
    <div class="countdown">
      <div class="tip">你已经参加夺宝成功~</div>
      <div class="timer">还剩{{diffTime.hours}}时{{diffTime.minutes}}分{{diffTime.seconds}}秒</div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    computed: {
        diffTime: function(){
          return Utils.getTime(this.$store.state.diffTime);
        }
    },
    mounted: function(){
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      // set colors

      context.fillStyle = 'yellow';
      context.strokeStyle = 'black';

      // draw face

      context.beginPath();
      context.arc(320, 240, 200, 0, 2 * Math.PI);
      context.fill()
      context.stroke();
      context.closePath();

      context.fillStyle = 'white';

      // draw eyes

      context.beginPath();
      context.arc(270, 175, 30, 0, 2 * Math.PI);
      context.fill()
      context.stroke();
      context.closePath();

      context.beginPath();
      context.arc(370, 175, 30, 0, 2 * Math.PI);
      context.fill()
      context.stroke();
      context.closePath();

      context.strokeStyle = 'red';

      // draw mouth 

      context.beginPath();
      context.arc(320, 240, 150, 0, -1 * Math.PI);
      context.stroke();
      context.closePath();

    }
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