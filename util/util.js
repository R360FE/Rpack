window.Utils = {
	getTime: function(t){
		var formatTime = this.formatTime;
		var mseconds = Math.floor( t/100 ) % 10;
	    var seconds = Math.floor( t/1000 % 60 );
	    var minutes = Math.floor( t/1000/60 % 60 );
	    var hours = Math.floor( t/1000/60/60 % 24 );
	    var days = Math.floor( t/1000/60/60/24 );
	    var hrs = days*24 + hours;        
	    return { hours: formatTime(hrs), minutes: formatTime(minutes), seconds: formatTime(seconds)+"."+mseconds};
	},
	formatTime: function(t){
		return t>=10 ? t : ("0"+t);
	},
	createNumArray: function(len){/*0-9*/
		return new Array(len).fill(1).map(function(item,index){
			return Math.round(Math.random()*10%10);
		});
	}
};

module.exports = window.Utils;