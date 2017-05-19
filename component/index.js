var Vue = require("vue");

var actitem = require("./actitem");
var luckydog = require("./luckydog");

Vue.use(actitem);
Vue.use(luckydog);

module.exports = {
	actitem: actitem,
	luckydog: luckydog
}