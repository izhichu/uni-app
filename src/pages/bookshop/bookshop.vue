<template>
	<view class="content">
		<view class="nav">
			<!-- <uni-search-bar :radius="100" @confirm="search"></uni-search-bar> -->
			<swiper indicator-dots :autoplay="true" :interval="3000" circular>
				<swiper-item v-for="item in swipers" :key="item.id">
					<image :src="item.imgUrl" :data-shopId="item.params.shopId" @click="goshoplunbo"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="famousPerson">
			<view class="title">名家专区</view>
			<view class="flexItem">
				<view class="item" v-for="item in famous" :key="item.id">
					<view class="subTitle">
						<view class="name" style="font-size: 35rpx;">{{item.title}}</view>
						<view class="intru" style="color: gray;font-size: 28rpx;">{{item.subTitle}}</view>
					</view>
					<image :src="item.imgUrl"></image>
				</view>
			</view>
		</view>
		<view class="featureRecommend">
			<view class="title">特色推荐</view>
			<van-tabs :ellipsis="false" title-active-color="#b41d13">
				<van-tab v-for="item in featureRecom" :title="item.subTitle" :key="item.id" >
					<view class="all">
						<view v-for="itemm in item.data" class="bookItem" :key="itemm.itemId" @click="ToDetail(itemm.itemId,itemm.shopId)">
							<image :src="itemm.imgUrl"></image>
							<text class="textone">{{itemm.itemName}}</text>
							<text class="texttwo">￥{{itemm.price}}</text>
						</view>
					</view>
				</van-tab>
			</van-tabs>
			<text class="lookMore">
				查看更多 >
			</text>
		</view>
		<view class="bookRecommend">
			<view class="title">书单推荐</view>
			<view class="scrollItem">
				<scroll-view class="scrollView" scroll-x="true" scroll-left="120">
					<view class="pro" v-for="item in bookListRecommend" :key="item.id">
						<image :src="item.imgUrl" mode=""></image>
						<view class="info">{{item.description}}</view>
					</view>
					<view class="lookAll" @click="gobooklist">
						查看全部183个书单			
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="bookshopRecommend">
			<view class="title">书店推荐</view>
			<van-tabs :ellipsis="false" title-active-color="#b41d13">
				<van-tab v-for="item in bookshopRecommend" :title="item.subTitle" :key="item.id">
					<view class="all" v-for="itemm in item.data" :key="item.id">
						<view class="bookShopItem">
							<image :src="itemm.userPic"></image>
							<view class="middle">
								<text class="textone">{{itemm.shopName}}</text>
								<text class="texttwo">{{itemm.tags}}</text>
							</view>
							<view class="button">
								<button class="mini-btn" type="default" size="mini" plain="true" style="color: #b41d13;border-color: #F0F0F0;" :data-shopId="itemm.shopId" @click="goshop">进店</button>
							</view>
						</view>
						<view class="bottombooks">
							<view v-for="itemx in itemm.data" class="bookItem" :key="item.id">
								<image :src="itemx.imgUrl" @click="toDetail" :data-itemId="itemx.itemId" :data-shopId="itemx.shopId"></image>
								<text class="textone">{{itemx.itemName}}</text>
								<text class="texttwo">￥{{itemx.price}}</text>
							</view>
						</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
		<view class="bookForyou">
			<view class="bookForyouTitle">
				为你推荐
			</view>
			<view class="bookForyouBooks">
				<view class="bookForyouBook" v-for="item in foryouRecommend" :key="item.id" @click="ToDetail(item.itemId,item.shopId)">
					<image :src="item.imgBig"></image>
					<view class="bookForyouName">
						{{item.itemName}}
					</view>
					<view class="bookForyouInfo">
						<text class="bookForyouOld">{{item.quality}}</text>
						<text class="bookForyouPlace">{{item.area}}</text>
					</view>
					<view class="bookForyouPrice">
						￥{{item.price}}
					</view>
				</view>
			</view>
		</view>
		<view class="nomore">
			- 没有更多了 -
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator"
	import uniBadge from "@/components/uni-ui/lib/uni-badge/uni-badge.vue";
	import uniSearchBar from '@/components/uni-ui/lib/uni-search-bar/uni-search-bar.vue';
	import {
		myRequest
	} from '@/utils/zgrequest.js'

	@Component({
		components: {
			uniBadge,
			uniSearchBar
		}
	})
	export default class Index extends Vue {
		private swipers: Array < any > = []
		private famous: Array < any > = []
		private famous1: Array < any > = []
		private famous2: Array < any > = []
		private famous3: Array < any > = []
		private bookListRecommend: Array < any > = []
		private featureRecom: Array < any > = []
		private bookshopRecommend: Array < any > = []
		private foryouRecommend: Array < any > = []
		
		created() {
			this.getSwipers();
			this.getfamous();
			this.getbookListRecommend();
			this.getbookshopRecommend();
			this.getforyouRecommend();
		}
		async getSwipers(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getChannelLunbo?channelId=1081&datasource=18'
			})
			// console.log(res, "轮播数据")
			this.swipers = res.result
		}
		async getfamous(): Promise < any > {
			for (var i = 1; i <= 4; i++) {
				const res = await myRequest({
					url: `/operation/mobile/ajax/getChannelSquare?channelId=1081&currPage=` + i
				})
				// console.log(res.result.list, "名家数据")
				this.famous1 = res.result.list[0].data;
				this.famous2 = res.result.list[1].data;
				this.famous3 = res.result.list[2].data;
				this.famous = (this.famous.concat(this.famous1, this.famous2, this.famous3)).slice(0, 21)
			}
			// console.log((this.famous).slice(0, 21), "名家数据")
		}
		async getbookListRecommend(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getChannelSquare?channelId=1081&currPage=4'
			})
			// console.log(res.result.list[2].data, "书单推荐数据");
			this.bookListRecommend = res.result.list[2].data;
			// console.log(res.result.list[1].data, "特色推荐");
			this.featureRecom = res.result.list[1].data;
			// console.log(res.result.list[1].data[0].data, "xxxxxxxxxx")
		}
		async getbookshopRecommend(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getChannelSquare?channelId=1081&currPage=5'
			})
			console.log(res.result.list[0].data, "书店推荐");
			this.bookshopRecommend = res.result.list[0].data;
			console.log(res.result.list[0].data[0].data[0].data);
			// this.shopId = res.result.list[0].data;
		}
		async getforyouRecommend(): Promise <any>{
			const res = await myRequest({
				method: 'GET',
				url: '/book/mobile/ajax/getRecommendItems?place=18'
			})
			this.foryouRecommend = res.data;
			console.log(res.data,"为你推荐")
		}
		gobooklist (): void{
			uni.navigateTo({
				url:'/pages/booklist/booklist'
			})
		}
		goshop (e) :void{
			console.log(e.target.dataset,"xxxxxxxxxxxxx")
			uni.navigateTo({
				url:`/pages/shop/index?shopId=${e.target.dataset.shopid}`
			})
		}
		goshoplunbo (e) :void{
			uni.navigateTo({
				url:`/pages/shop/index?shopId=${e.target.dataset.shopid}`
			})
		}
		toDetail (e) :void{
			console.log(e.target.dataset.itemid,e.target.dataset.shopid,"6666666666666666")
			uni.navigateTo({
			    url: `/pages/bookDetail/bookDetail?itemId=${e.target.dataset.itemid}&shopId=${e.target.dataset.shopid}`
			});
		}
		ToDetail(a, b) {
			console.log(a,b,"嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻")
			uni.navigateTo({
				url: `/pages/bookDetail/bookDetail?itemId=${a}&shopId=${b}`
			});
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: rgb(243,243,243);
		padding-bottom: 50rpx;
		.nav {
			padding-bottom: 50rpx;
			background-color: #ffffff;

			uni-search-bar {
				width: 700rpx;
			}

			swiper {
				height: 380rpx;

				image {
					width: 750rpx;
					height: 380rpx;
				}
			}
		}

		.famousPerson {
			background-color: #ffffff;
			margin-top: 20rpx;
			.title {
				font-family: STFangsong;
				padding-top: 55rpx;
				font-weight: bolder;
				padding-bottom: 30rpx;
				margin-left: 20rpx;
			}

			.flexItem {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				height: 1500rpx;
				justify-content: space-evenly;
				padding-bottom: 30rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
				.item {
					display: flex;
					justify-content: space-around;
					align-items: center;
					background-color: rgb(243, 243, 243);
					width: 50%;
					height: 160rpx;
					// margin-top: 5rpx;
					margin-left: 5rpx;
					border-radius: 10rpx;

					.subTitle {
						height: 160rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;

						.intru {
							width: 200rpx;
							word-break: break-all;
							/*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
							text-overflow: ellipsis;
							display: -webkit-box;
							/** 对象作为伸缩盒子模型显示 **/
							-webkit-box-orient: vertical;
							/** 设置或检索伸缩盒对象的子元素的排列方式 **/
							-webkit-line-clamp: 1;
							/** 显示的行数 **/
							overflow: hidden;
							/** 隐藏超出的内容 **/
						}
					}

					image {
						width: 110rpx;
						height: 110rpx;
						border-radius: 10rpx;
					}
				}

				.item:nth-child(1) {
					height: 325rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					box-sizing: border-box;
					padding-left: 20rpx;
					padding-bottom: 20rpx;
					image {
						width: 320rpx;
						height: 160rpx;
					}
				}

				// .item:nth-child(2n+4) {
				// 	transform: translateY(-170rpx);
				// }

				// .item:nth-child(21) {
				// 	position: relative;
				// 	top: -170rpx;
				// 	left: 350rpx;
				// }
			}
		}

		.featureRecommend {
			
			background-color: #ffffff;


			.title {
				padding-top: 55rpx;
				font-weight: bolder;
				padding-bottom: 30rpx;
				font-family: STFangsong;
				padding-left: 20rpx;
				margin-top: 20rpx;
			}
			van-tabs {
				.van-tabs__line {
					display: none !important;
				}
				.van-tabs__nav--complete{
					padding-left: 0;
				}

				van-tab {
					
							
					.all {
						padding: 20rpx;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;

						.bookItem {
							// margin-left: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;
							margin-bottom: 30rpx;

							image {
								width: 210rpx;
								height: 210rpx;
								display: inline-block;
								border-radius: 10rpx;
							}

							.textone {
								display: inline-block;
								margin-top: 10rpx;
								margin-bottom: 10rpx;
								width: 210rpx;
								font-size: 30rpx;
								word-break: break-all;
								/*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
								text-overflow: ellipsis;
								display: -webkit-box;
								/** 对象作为伸缩盒子模型显示 **/
								-webkit-box-orient: vertical;
								/** 设置或检索伸缩盒对象的子元素的排列方式 **/
								-webkit-line-clamp: 2;
								/** 显示的行数 **/
								overflow: hidden;
								/** 隐藏超出的内容 **/
							}

							.texttwo {
								display: inline-block;
								color: #b41d13;
								font-size: 30rpx;
							}
						}
					}
				}
			}

			.lookMore {
				display: inline-block;
				color: rgb(113, 137, 183);
				margin-left: 50%;
				transform: translateX(-50%);
				font-size: 35rpx;
				margin-top: 10rpx;
				margin-bottom: 25rpx;
			}
		}

		.bookRecommend {
			margin-top: 20rpx;
			background-color: #ffffff;

			.title {
				padding-top: 55rpx;
				font-weight: bolder;
				padding-bottom: 30rpx;
				font-family: STFangsong;
				padding-left: 20rpx;
			}

			.scrollView {
				white-space: nowrap;
				width: 100%;
				height: 500rpx;
				margin-right: 20rpx;
				.pro {
					width: 670rpx;
					height: 450rpx;
					// border: 1px solid red;
					border-radius: 10rpx;
					border: 1px solid #EEEEEE;
					display: inline-block;
					margin-left: 20rpx;

					image {
						width: 670rpx;
						height: 350rpx;
					}

					.info {
						// white-space: normal;  //info内元素换行
						margin-top: 15rpx;
						margin-left: 20rpx;
						color: #909090;
						font-size: small;

					}
				}
				.lookAll{
					width: 260rpx;
					height: 450rpx;
					padding-top: 150rpx;
					padding-left: 50rpx;
					padding-right: 50rpx;
					box-sizing: border-box;
					margin-right: 20rpx;
					border: 1px solid #EEEEEE;
					border-radius: 10rpx;
					position: relative;
					left: 2100rpx;
					top: -455rpx;
					// display: inline-block;
					background-color: rgb(250,250,250);
					white-space: normal;
					text-align: center;
				}
			}
		}

		.bookshopRecommend {
			
			background-color: #ffffff;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.title {
				padding-top: 55rpx;
				font-weight: bolder;
				padding-bottom: 30rpx;
				font-family: STFangsong;
				margin-top: 20rpx;
			}

			van-tabs {
				.van-tabs__line {
					display: none !important;
				}
				.van-tabs__nav--complete{
					padding-left: 0;
				}
				van-tab {

					.all {
						.bookShopItem {
							display: flex;
							background-color: rgb(250, 250, 250);

							image {
								height: 120rpx;
								width: 120rpx;
								flex: 1;
								border-radius: 10rpx;
								margin: 20rpx;

							}

							.middle {
								flex: 4;
								display: flex;
								flex-direction: column;
								justify-content: space-evenly;

								.textone {
									display: inline-block;
									font-size: 35rpx
								}

								.texttwo {
									display: inline-block;
									color: #909090;
									font-size: 30rpx;

								}
							}

							.button {
								flex: 1.5;
								// display: flex;
								margin-top: 50rpx;

								.mini-btn {
									padding: 10rpx 25rpx;
									line-height: 40rpx;
									box-sizing: border-box;
								}
							}
						}

						.bottombooks {
							display: flex;
							flex-direction: row;
							flex-wrap: wrap;
							justify-content: space-evenly;
							background-color: rgb(250, 250, 250);
							margin-bottom: 20rpx;

							.bookItem {
								// margin-left: 20rpx;
								display: flex;
								flex-direction: column;
								justify-content: space-evenly;

								image {
									width: 210rpx;
									height: 210rpx;
									display: inline-block;
									border-radius: 10rpx;
								}

								.textone {
									display: inline-block;
									margin-top: 10rpx;
									margin-bottom: 10rpx;
									width: 210rpx;
									font-size: 30rpx;
									word-break: break-all;
									/*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
									text-overflow: ellipsis;
									display: -webkit-box;
									/** 对象作为伸缩盒子模型显示 **/
									-webkit-box-orient: vertical;
									/** 设置或检索伸缩盒对象的子元素的排列方式 **/
									-webkit-line-clamp: 1;
									/** 显示的行数 **/
									overflow: hidden;
									/** 隐藏超出的内容 **/
								}

								.texttwo {
									display: inline-block;
									color: #b41d13;
									font-size: 30rpx;
								}
							}
						}

					}
				}
			}
		}

		.bookForyou {
				width: 100%;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				padding-top: 30rpx;
				display: flex;
				flex-direction: column;
				position: relative;
				align-items: center;
				.bookForyouTitle {
					padding-bottom: 20rpx;
					width:100%;
					padding-left: 5%;
					font-family: STFangsong;
					font-weight: bolder;
					// background: linear-gradient(#ffffff, #f3f3f3);
					background-color: white;
					box-sizing: border-box;
					margin-top: 20rpx;
					margin-bottom: 20rpx;
				}
				.bookForyouBooks {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-evenly;
					background-color: #f3f3f3;
					.bookForyouBook {
						width: 345rpx;
						height: 550rpx;
						background-color: #ffffff;
						margin-bottom: 20rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						border-radius: 15rpx;
						image {
							width: 345rpx;
							height: 345rpx;
							border-top-right-radius: 15rpx;
							border-top-left-radius: 15rpx;
						}
						.bookForyouName {
							width: 90%;
							font-size: 30rpx;
							height: 78rpx;
							overflow: hidden;
							margin-top: 20rpx;
							margin-bottom: 20rpx;
						}
						.bookForyouInfo {
							width: 90%;
							color: #909090;
							font-size: 30rpx;
							margin-bottom: 10rpx;
							.bookForyouOld {
								width: 50rpx;
								background-color: #f9f9f7;
								left: 0;
							}
									
							.bookForyouPlace {
								width: 160rpx;
								float: right;
								text-align: right;
							}
						}
						.bookForyouPrice {
							width: 90%;
							color: #b41d13;
							font-size: 35rpx;
							font-weight: 600;
							margin-bottom: 10rpx;
						}
					}	
				}		
			}	
			.nomore{
				background-color: rgb(243,243,243);
				color: rgb(197,197,197);
				font-size: 30rpx;
				box-sizing: border-box;
				text-align: center;
				margin-top:50rpx;
				
			}
	}
</style>
