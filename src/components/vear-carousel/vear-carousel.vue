<template>
	<view class="carousel">
		<view class="title">
			推荐书单
			<view class="more">
				更多>
			</view>
		</view>
		<swiper class="image-container" previous-margin="45rpx" next-margin="45rpx"  @change="swiperChange" circular="true">
		
			<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" v-for="(item, index) in imgList" :key="item[urlKey]">
				<image @click="clickImg(item)" :class="currentIndex == index ? 'item-img' : 'item-img-side'" :src="item[urlKey]" lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''" mode="aspectFill"></image>
			</swiper-item>
			
		</swiper>
	</view>
	
</template>
<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default() {
					return []
				}
			},
			listCount:{
				type:Number,
				default(){
					return 0
				}
			},
			urlKey: {
				type: String,
				default() {
					return ''
				}
			},
		},
		data() {
			return {
				currentIndex: 0,
				dontFirstAnimation: true
			}
		},
		methods: {
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
			},
			clickImg(item) {
				this.$emit('selected', item, this.currentIndex)
			}
		}
	}
</script>
<style scoped>
	.more {
		position: absolute;
		top: 30rpx;
		right: 10rpx;
		font-size: 24rpx;
		font-family: none;
		font-weight: 400;
		color: #909090;
	}
	.carousel{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	.title{
		width: 95%;
		margin-top: 30rpx;

		font-family: STFangsong;
		font-size: 38rpx;
		font-weight: bolder;

	}
	.image-container {
		width: 750rpx;
		height: 350rpx;

	}

	.item-img {
		width: 630rpx;
		height: 300rpx;
		border-radius: 14rpx;
		animation: to-big .3s;
		box-shadow: 0 0 20rpx 3rpx #C0C0C0;
	}

	.swiper-item {
		width: 630rpx;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.item-img-side {
		width: 630rpx;
		height: 260rpx;
		border-radius: 14rpx;
		animation: to-mini .3s;
	}

	.swiper-item-side {
		width: 630rpx;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@keyframes to-mini
	{
		from {
			height: 300rpx;
		}
		to {
			height: 260rpx;
		}
	}
	@keyframes to-big
	{
		from {
			height: 260rpx;
		}
		to {
			height: 300rpx;
		}
	}
</style>
