<template>
	<view class="main" v-if="shopDetail.shopName != undefined">
		<view class="top-card">
			<image :src="shopDetail.userPic" class="cover"></image>
			<view class="right-content">
				<view class="title">
					{{shopDetail.shopName}}
				</view>
				<view class="tips">
					自营
				</view>
				<view class="Collection">
					{{shopDetail.favoriteNum.c}}人收藏
				</view>
			</view>
			<view class="likeicon">
				<van-icon name="like-o" /><text>收藏</text>
			</view>
		</view>
		
		<view class="card">
			<view class="cell">
				<text class="left">店铺等级</text>
				<text class="right">{{shopDetail.shopClassName[shopDetail.shopClassName.length-1]}}</text>
			</view>
		</view>
		
		<view class="card red">
			<view class="ninety">
				90天平均
			</view>
			<view class="cell">
				<text class="left">成功完成</text>
				<text class="right">{{shopDetail.orderRate.c}}</text>
			</view>
			<view class="cell">
				<text class="left">好评率</text>
				<text class="right">{{shopDetail.goodReviewRate.c}}</text>
			</view>
			<view class="cell">
				<text class="left">发货时间</text>
				<text class="right">{{shopDetail.shippingTimeAvg.c}}</text>
			</view>
		</view>
		
		<view class="card">
			<view class="cell">
				<text class="left">店主</text>
				<text class="right">{{shopDetail.nickname}}</text>
				<van-icon name="comment-o" />
			</view>
			<view class="cell">
				<text class="left">电话</text>
				<text class="right">{{shopDetail.publicTel}}</text>
				<van-icon name="phone-o" />
			</view>
			<view class="cell">
				<text class="left">地址</text>
				<text class="right">{{shopDetail.address}}</text>
			</view>
			<view class="cell">
				<text class="left">开店时间</text>
				<text class="right">{{shopDetail.openedDate}}</text>
			</view>
		</view>
		
		<view class="card">
			<view class="cell">
				<text class="left">实名认证</text>
				<text class="right">{{shopDetail.realNameCertify==1?'已认证':'未认证'}}</text>
			</view>
			<view class="cell">
				<text class="left">工商资质</text>
				<text class="right">{{shopDetail.licenseCertified==1?'已认证':'未认证'}}</text>
			</view>
		</view>
		
	</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component
	} from "vue-property-decorator";
	import {myRequest} from "@/utils/zgrequest.js"
	@Component({})
	export default class ShopDetail extends Vue {
		private shopDetail: any = {}
		private shopId: number = 0
		async onLoad(options){
			this.shopId = options.shopId
			let res = await myRequest({
				method: "GET",
				url: "/shop-front/mobile/ajax/getShopDetail",
				data: {
					shopId: this.shopId
				}
			})
			this.shopDetail = res.data
			uni.setNavigationBarTitle({
			    title: '店铺详情'
			});
		}
		
	}
</script>

<style lang="scss" scoped>
	.main{
		background-color: #f5f5f5;
		.top-card {
			background-color: #fff;
			padding: 40rpx;
			position: relative;
			.cover {
				width: 140rpx;
				height: 140rpx;
				float: left;
				margin-right: 30rpx;
				border-radius: 5px;
			}
			.right-content {
				.title {
					font-size: 36rpx;
					color: #393939;
				}
				.tips{
					font-size: 20rpx;
					display: inline-block;
					padding: 3rpx 10rpx;
					color: #fff;
					background-color: #b41d13;
					border-radius: 3px;
				}
				.Collection{
					margin-top: 10rpx;
					font-size: 25rpx;
					color: #999999;
				}
			}
			.likeicon {
				width: 100rpx;
				font-size: 26rpx !important;
				color: #b41d13;
				font-weight: 600;
				position: absolute;
				right: 30rpx;
				top: 40rpx;
				/deep/van-icon {
					font-size: 38rpx !important;
					vertical-align: text-bottom;
				}
			}
		}
		
		.card{
			background-color: #fff;
			margin-top: 10rpx;
			padding: 30rpx 40rpx;
			.ninety{
				font-size: 25rpx;
				color: #909090;
			}
			.cell{
				margin-top: 20rpx;
				.left{
					color: #535353;
					margin-right: 60rpx;
					display: inline-block;
					width: 128rpx;
				}
				.right{
					color: #3a3a3a;
				}
				van-icon{
					vertical-align: text-bottom;
					font-size: 38rpx;
					margin-left: 10rpx;
					color: #89da9d;
				}
			}
			.cell:first-child{
				margin: 0;
			}
		}
		.red{
			.cell{
				.right{
					color: #b41d13;
				}
			}
		}
		
	}
	
</style>
