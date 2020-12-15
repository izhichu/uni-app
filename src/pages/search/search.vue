<template>
	<view>
		<view class="toTop" @click="toTop" v-if="show">
			<view class="sword">
				︿
			</view>
			<view class="font">
				顶部
			</view>
		</view>
		<view class="searchBox">
			<view class="inputBox">
				<image src="../../static/icon/search.png" mode=""></image>
				<input type="text" placeholder="商品名称 作者 出版社 ISBN" placeholder-style="font-size:30rpx; color:#909090" class="search"
				 @input="onKeyInput" />
			</view>
			<view class="buttom" @click="search">
				搜索
			</view>
		</view>

		<view class="result">

			<view class="hotSearch" v-if="turn">
				<view class="title">
					热门搜索
				</view>
				<view class="content">
					<view class="label" v-for="item in hotSearch" @click="getSearchResult(item.keyword),cleanUp" >
						{{item.keyword}}
					</view>
				</view>
			</view>

			<view class="searchResult" v-if="turn==false">
				<view class="count">
					共搜{{count}}到件商品
				</view>
				<view class="goods" v-for="item in searchResult" @click="toDetail(item.itemId,item.shopId)">
					<image :src="item.normalImg" mode=""></image>
					<view class="info">
						<view class="goodsTitle">{{item.itemName}}</view>
						<view class="smallTitle">{{item.importantDesc}}</view>
						<view class="author">{{item.author}}</view>
						<view class="priceAndOthers">
							<view class="price">{{item.price}}</view>
							<view class="old">{{item.quality}}</view>
							<view class="postPrice">快递费8.0</view>
						</view>
						<view class="shop">{{item.shopName}}></view>
					</view>
				</view>


			</view>
		</view>


	</view>
</template>


<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator";
	import {
		myRequest
	} from '@/utils/zgrequest.js';
	@Component({})

	export default class allCategories extends Vue {
		private hotSearch: Array < any >= []
		private inputValue: String = ""
		private turn: Boolean = true
		private count: Number = 0
		private searchResult: Array < any >= []
		private pagenum: any = 1
		private show: Boolean = false;
		created() {
			this.getHotSearch()
			console.log(444)

		}
		onPageScroll(e) {
			if (e.scrollTop > 1000) {
				this.show = true;
			} else {
				this.show = false
			}
		}
		toTop(): void {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 1000
			})
		}
		onReachBottom() {
			this.pagenum++
			this.getSearchResult(this.inputValue);
		}
		async getHotSearch(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/api-search/Suggest/Suggest/app'
			})
			this.hotSearch = res.data.wordList
		}
		async getSearchResult(key): Promise < any > {
			this.turn = false;
			
			const res = await myRequest({
				method: 'POST',
				url: '/api-search/product/search/mobile',
				data: {
					// params:'status=0&key=大大&pagenum=1&pagesize=20&order=0&quaselect=1&area=1001000000'
					params: JSON.stringify({
						"status": 0,
						"key": key,
						"pagenum": this.pagenum,
						"pagesize": 20,
						"order": 0,
						"quaselect": 1,
						"area": 1001000000
					})
				}
			})
			this.count = res.data.page.recordCount
			this.searchResult = (this.searchResult).concat(res.data.itemList)
			console.log(res.data.itemList)
		}
		cleanUp(){
			this.searchResult=[];
		}
		onKeyInput(event) {
			this.inputValue = event.target.value
		}
		search() {
			this.searchResult=[];
			this.turn = false;
			
			this.getSearchResult(this.inputValue)
		}
		toDetail(itemId,shopId){
			console.log(itemId,shopId)
			uni.navigateTo({
			    url: `/pages/bookDetail/bookDetail?itemId=${itemId}&shopId=${shopId}`
			});
		}



	}
</script>

<style scoped>
	.searchBox {
		width: 100%;
		height: 200rpx;
		display: flex;
		background-color: #f9f9f7;
	}

	.buttom {
		color: #b41d13;
		font-size: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 30rpx;

	}

	.inputBox {
		width: 80%;
		height: 60rpx;
		display: flex;
		box-shadow: 0 0 20rpx 1rpx #bababa;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.inputBox image {
		width: 40rpx;
		height: 40rpx;
		margin-top: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.placeholder {
		font-size: 28rpx;
		color: #909090;
	}

	.search {
		height: 60rpx;
		width: 70%
	}

	.result {
		width: 100%;
		height: 1056rpx;
		position: absolute;
		top: 150rpx;
		background-color: #FFFFFF;
		border-top-right-radius: 60rpx;
		border-top-left-radius: 60rpx;
		box-shadow: 0 0 20rpx 1rpx #bababa;
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.hotSearch {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin-top: 40rpx;
		flex-wrap: wrap;
	}

	.title {
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #2f2f2f;
	}

	.content {
		width: 100%;
		display: flex;
		padding: 20rpx;
		flex-wrap: wrap;

	}

	.label {
		font-size: 28rpx;
		color: #909090;
		background-color: #f9f9f7;
		padding: 10rpx 10rpx;
		margin: 20rpx;
		border-radius: 10rpx;
	}

	.searchResult {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin-top: 40rpx;
		flex-wrap: wrap;
	}

	.count {
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #2f2f2f;
		border-bottom: 1rpx solid #f9f9f7;
	}

	.goods {
		margin-top: 30rpx;
		width: 100%;
		height: 320rpx;
		display: flex;
		border-bottom: 1rpx solid #000000;
		overflow: hidden;
		border-bottom: 1rpx solid #f9f9f7;
	}

	.info {
		width: 60%;
		right: 0;
	}

	.goods image {
		width: 280rpx;
		height: 280rpx;
		margin-right: 20rpx;
		border: 1rpx solid #f9f9f7;
	}

	.goodsTitle {
		font-size: 34rpx;
	}

	.smallTitle {
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #595900;
		white-space: nowrap;
	}

	.author {
		font-size: 28rpx;
		margin-top: 10rpx;
		white-space: nowrap;
		color: #343434;
	}

	.priceAndOthers {
		display: flex;
		margin-top: 20rpx;
		height: 50rpx;
	}

	.price {
		font-size: 36rpx;
		color: #b41d13;
		margin-right: 10rpx;
		font-weight: 500;
		line-height: 50rpx;
	}

	.old,
	.postPrice {
		font-size: 26rpx;
		margin-right: 10rpx;
		line-height: 50rpx;
		background-color: #f9f9f7;
		color: #909090;
	}

	.shop {
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #909090;
	}

	.toTop {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #ffffFF;
		border: 2rpx solid #909090;
		position: fixed;
		bottom: 150rpx;
		right: 50rpx;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 26rpx;
	}

	.sword {
		font-size: 30rpx;
		transform: translateY(-10rpx);

	}
</style>
