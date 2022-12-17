<script>
export default {
	onLaunch: function () {
		console.log('App Launch')

		const res = uni.getSystemInfoSync()
		this.$store.commit('common/setApp', res)
		this.$store.dispatch('common/getIp')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
// @import "@/uni_modules/uview-ui/theme.scss";
/*每个页面公共css */
</style>
