<template>
	<view class="bookSwiper">
		<view class="bookSwiperTitle">
			{{bookSwiper.name}}
			<view class="more">
				更多>
			</view>
		</view>
		<scroll-view class="books" scroll-x="true"  scroll-left="0" scroll-with-animation>
			<view class="book" v-for="item in books" @click="toDetail(item.shopId,item.itemId)">
				<image :src="item.imgUrl" mode=""></image>
				<view class="bookName">{{item.itemName}}</view>
				<view class="bookPrice">￥{{item.price}}</view>
			</view>
			
			
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Prop
	} from "vue-property-decorator";

	@Component({
		
	})
	export default class bookSwiper extends Vue {
		private books: Array < any >= [];
		@Prop({
			type: Object
		}) private bookSwiper!:any;
		
		created(){
			
			this.books =this.bookSwiper.data[0].data;
		}
		toDetail(shopId,itemId) {
			console.log(itemId,shopId)
			uni.navigateTo({
			    url: `/pages/bookDetail/bookDetail?itemId=${itemId}&shopId=${shopId}`
			});
		}

	}
</script>

<style scoped>
	.bookSwiper {
		width:100%;
		height: 400rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		position: relative;
		padding-top: 30rpx;
		display: flex; 
    	flex-direction: column;
		align-items: center

	}



	.bookSwiperTitle {
		margin-bottom: 30rpx;
		width: 95%;
		font-family: STFangsong;
		font-size: 38rpx;
		font-weight: bolder;
	}

	.books {
		width: 95%;
		height: 300rpx;
		background-color: #FFFFFF;
		white-space:nowrap
	}

	.book {
		width: 180rpx;
		height: 300rpx;
		background-color: #FFFFFF;
	    display: inline-block;
		margin-right: 20rpx;
		position: relative;
	}
	.book image{
		width: 180rpx;
		height: 180rpx;
		border-radius: 15rpx;
	}
	.bookName{
		width: 180rpx;
		height: 72rpx;
		line-height: 36rpx;
		font-size: 26rpx;
		white-space:normal;
		overflow: hidden;
	}
	.bookPrice{
		font-size: 26rpx;
		color: #aa1912;
	}
	.more {
		position: absolute;
		top: 30rpx;
		right: 10rpx;
		font-size: 24rpx;
		font-family: none;
		font-weight: 400;
		color: #909090;
	}
</style>
