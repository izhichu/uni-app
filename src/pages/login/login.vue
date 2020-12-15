<template>
	<view class="login">

		<image src="../../static/icon/timg.png" mode="" class="please"></image>
		<view class="words">
			为了给您提供更好的用户体验 需要你的授权
		</view>
		<button open-type="getUserInfo" @click="toIndex" bindgetuserinfo="bindGetUserInfo" class="yes" >去授权</button>
		<button class="no" @click="toIndex">暂不授权</button>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator";
	@Component({})

	export default class login extends Vue {
		toIndex() {
			console.log("ehehehhe")
			uni.navigateBack({
				delta: 1
			});
		}
		getUserInfo(): void {
			wx.getSetting({
				success: res => {
					console.log(res.authSetting)
					wx.getUserInfo({
						success: function(res2) {
							console.log(res2)
							uni.setStorage({
								key: 'userInfo',
								data: res2,
								success: function(): void {
									console.log('存储成功')
								}
							})
						}
					})
				}


			})
		}

		created() {
			this.getUserInfo()
			
		}



	}
</script>

<style scoped>
	.login {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.words {
		width: 375rpx;
		font-size: 30rpx;
		font-family: STFangsong;
		font-weight: 500;
		text-align: center;
		margin-top: 50rpx;
	}

	.please {
		margin-top: 40rpx;
		width: 260rpx;
		height: 260rpx;
	}

	button {
		height: 80rpx;
		width: 80%;
		border-radius: 40rpx;
		font-size: 30rpx;
	}

	.yes {
		background-color: #b41d13;
		color: #FFFFFF;
		margin-top: 100rpx;
	}

	.no {
		background-color: #FFFFFF;
		margin-top: 50rpx;
		border: 1px solid #909090;
		color: #909090;
	}
</style>
