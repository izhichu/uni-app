<template>
	<view>
		<!-- <view class="main-top">
			<view class="top">
				书籍列表
			</view>
		</view> -->
		<view class="item" v-for="item in book" @click="toDetail(item.itemId,item.shopId)">
			<view class="item-book">
				<view class="book-left">
					<image :src="item.normalImg"></image>
				</view>
				<view class="book-right">
					<text class="book-name">{{item.itemName}}</text>
					<text class="book-author">{{item.author}}</text>
					<view class="book-mid">
						<text class="book-price">￥{{item.price}}</text>
						<text class="book-quality">{{item.quality}}</text>
					</view>
					<text class="shop-name">{{item.shopName}} ></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import {
		myRequest
	} from "@/utils/zgrequest.js"
	
	export default {
		data() {
			return {
				book:'',
				catId:''
			}
		},
		props : ["title"],
		methods: {
			onLoad(options) {
				console.log(options);
				this.catId=options.catId
				this.getList();
				uni.setNavigationBarTitle({
				    title: '商品列表'
				});
			},
			async getList() {
				console.log(this.catId,"FGFFFHGFYGKIGFGHGKU")
				const res = await myRequest({
					method: 'GET',
					url: `/api-search/product/browse/mobile?bizType=wechat&host=mbook&params=%7B"pagenum"%3A1%2C"order"%3A0%2C"catnum"%3A"${this.catId}"%7D`
				})
				console.log(res.data)
				this.book=res.data.itemList;
			},
			toDetail(itemId,shopId){
				console.log(itemId,shopId)
				uni.navigateTo({
				    url: `/pages/bookDetail/bookDetail?itemId=${itemId}&shopId=${shopId}`
				});
			}
		}
	}
</script>

<style lang="less">
	.main-top{
		padding: 30upx 20upx 30upx 20upx;
		.top{
			width: 100%;
			height: 80upx;
			text-align: center;
			line-height: 80upx;
			background-color: #b41d13;
			color: white;
			font-size: 40upx;
			font-family: KaiTi;
			border-radius: 20upx;
		}
	}
	.item{
		padding-left: 20upx;
		padding-right: 20upx;
		.item-book{
			height: 400upx;
			width: 100%;
			border-bottom: 1px solid lightgray;
			.book-left{
				width: 45%;
				height: 100%;
				float: left;
				position: relative;
				image{
					position: absolute;
					height: 320upx;
					width: 100%;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
			}
			.book-right{
				padding-left: 20upx;
				padding-top: 20upx;
				padding-bottom: 30upx;
				width: 52%;
				height: 100%;
				// float: left;
				display: flex;
				flex-direction: column;
				position: relative;
				.book-name{
					position: absolute;
					top: 5%;
					font-size: 34upx;
					display: -webkit-box;
					/*作为弹性伸缩盒子模型显示*/
					-webkit-line-clamp: 2;
					/*显示的行数；如果要设置2行加...则设置为2*/
					overflow: hidden;
					/*超出的文本隐藏*/
					text-overflow: ellipsis;
					/* 溢出用省略号*/
					-webkit-box-orient: vertical;
					/*伸缩盒子的子元素排列：从上到下*/
				}
				.book-author{
					top: 30%;
					position: absolute;
					font-size: 32upx;
					color: gray;
				}
				.book-mid{
					top: 45%;
					position: absolute;
					margin-top: 20upx;
					margin-bottom: 20upx;
					.book-price{
						font-size: 38upx;
						color: #b41d13;
					}
					.book-quality{
						margin-left: 50upx;
						border-radius: 10upx;
						color: gray;
						background-color: #f3f3f3;
						padding: 5upx 10upx 5upx 10upx;
					}
				}
				.shop-name{
					top: 72%;
					position: absolute;
					font-size: 32upx;
					color: gray;
				}
			}
		}
	}
</style>
