module.exports = {
		name: "luckydog",
		props: {
			luckydog: Object
		},
		methods: {
			goLuckydogs: function(){
				this.$emit("goLdPage");//子组件出发事件goLdPage
			}
		}
	}