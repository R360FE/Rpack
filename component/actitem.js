module.exports = {
 	name: "actItem",
 	// data: function(){
 	// 	return {
 	// 		diffTime: "20000000"
 	// 	}
 	// },
 	data: function(){
 		return {
 			dtm: {}
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
			// alert("Event is triggered! Current Coupon is:  " +  this.$props.currentCoupon );
			this.$router.push({path: "/result"});
		}
	},
	mounted:function(){//lifecycle
		var self = this;
		self.dtm = self.$store.getters.getTime;
	    if(self.$store.state.diffTime>0){
	    	var timeinterval = setInterval(function(){ //1s倒计时  
	            self.$store.commit("decreaseTm");
	            if(self.$store.state.diffTime<=0){
	    			clearInterval(timeinterval);	              
	    	      	window.location.reload();
	            }
	            self.dtm = self.$store.getters.getTime;            
	        },100);
	    }
	}
	
 }