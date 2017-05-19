var ActItemComponent = require("./actitem.vue");

module.exports = {
	install: function(Vue){
		Vue.component('actitem', ActItemComponent);
		// Vue.component('actitem', function (resolve) {
		//   // 这个特殊的 require 语法告诉 webpack
		//   // 自动将编译后的代码分割成不同的块，
		//   // 这些块将通过 Ajax 请求自动下载。
		//   require(['./actitem'], resolve)
		// })
	}
}