module.exports = {
 	name: "actItem",
 	// data: function(){
 	// 	return {
 	// 		stage: 1,
 	// 		nextTime: "17/01/01",//computed?
 	// 		showWinTime: "17/01/01",
 	// 		currentCoupon: 0,
 	// 		sumCoupon: 1000,
 	// 		status: 2
 	// 	}
 	// },
 	data: function(){
 		return {
 			diffTime: "20000000"
 		}
 	},
 	props: ["stage","nextTime","showWinTime","currentCoupon","sumCoupon","status"],
 	computed:{
 		pwidth: function(){
 			return parseInt(this.$props.currentCoupon)/parseInt(this.$props.sumCoupon)*100;
 		}
 	},
	methods: {
		goParticipate: function(e){
			alert("Event is triggered! Current Coupon is:  " +  this.$props.currentCoupon );
		}
	},
	mounted:function(){//lifecycle
		var self = this, $el = $(self.$el),tm = self.diffTime,
				$hours = $el.find(".hours"),
				$minutes = $el.find('.minutes'),
				$seconds = $el.find(".seconds"),
				t = Utils.getTime(tm);
			$hours.text(t.hours);
		    $minutes.text(t.minutes);
		    $seconds.text(t.seconds);
		    if(tm){
		    	var timeinterval = setInterval(function(){ //1s倒计时  
		            tm = tm-100;   
		            if(tm<=0){
		    			clearInterval(timeinterval);	              
		    	      	window.location.reload();
		            }
		            t = Utils.getTime(tm)
		            $hours.text(t.hrs);
		            $minutes.text(t.minutes);
		            $seconds.text(t.seconds);                 
		        },100);
		    }
	},
	
 }