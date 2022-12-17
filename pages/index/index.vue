<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<view class="btn" @click="scan">
			扫码
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {

	},
	methods: {
		scan() {
			uni.scanCode({
				scanType: "qrCode",
				fail: res => {
					uni.showToast({
						title: '扫码失败',
						//将值设置为 success 或者直接不用写icon这个参数
						icon: 'error',
						//显示持续时间为 2秒
						duration: 2000
					})
					// uni.showLoading({
					// 	title: '加载中...'
					// });

					// uni.hideLoading();
				},
				success: function (res) {
					if (res.scanType == 'QR_CODE') {
						// res.result
					} else {

					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
