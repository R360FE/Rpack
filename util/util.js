window.Utils = {
	getTime: function(t){
		var formatTime = this.formatTime;
		var mseconds = Math.floor( t/100 ) % 10;
	    var seconds = Math.floor( (t/1000) % 60 );
	    var minutes = Math.floor( (t/1000/60) % 60 );
	    var hours = Math.floor( (t/1000/60/60) % 24 );
	    var days = Math.floor( t/1000/60/60/24 );
	    var hrs = days*24 + hours;        
	    return { hours: formatTime(hrs), minutes: formatTime(minutes), seconds: formatTime(seconds)+"."+mseconds};
	},
	formatTime: function(t){
		return t>=10 ? t : ("0"+t);
	}
}

module.exports = window.Utils;