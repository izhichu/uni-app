<template>
	<view>
		<view class="main">
			<view class="top-card">
				<image :src="shopDetail.userPic" mode="" class="cover"></image>
				<view class="right-content">
					<view class="title">
						{{shopDetail.shopName}}
					</view>
					<view class="icon">
						<image src="/static/logo.png" mode=""></image>
						<image src="/static/logo.png" mode=""></image>
						<image src="/static/logo.png" mode=""></image>
						<image src="/static/logo.png" mode=""></image>
					</view>
					<view class="tips">
						<view>关注<text class="dd">{{shopDetail.favoriteNum.c}}</text></view>
						<view>发货<text class="dd">{{shopDetail.shippingTimeAvg.c}}</text></view>
						<view>好评<text class="dd">{{shopDetail.goodReviewRate.c}}</text></view>
					</view>
				</view>
				<view class="likeicon">
					<van-icon name="like-o" /><text>收藏</text>
				</view>
			</view>

			<!-- 公告栏 -->
			<van-notice-bar left-icon="volume-o" background="#eeeeee" color="#393939" mode="link" :text="shopDetail.notice==''?shopDetail.shareIntro:shopDetail.notice " @click="onDialog"></van-notice-bar>

			<!-- 公告弹出框 -->
			<van-dialog id="van-dialog"></van-dialog>

			<!-- 自定义tab分页 -->
			<van-tabs sticky class="tab" color="#dd2117" @click="onTabChange">
				<van-tab title="全部商品">
					<van-sticky offset-top="44">
						<view class="tab-sort">
							<view v-for="(item,index) in tabList" :key="item.tab" :class="{mytab:true,active: currentIndex == index}" @click="switchSort(index,item)">
								{{item.tab}}
								<image v-if="item.img !==''" :src="item.img" :class="{sorticon:true}"></image>
							</view>
							<view class="item">
								<image :src="isDisplay?'/static/icon/双列表.png':'/static/icon/单列表.png'" @click="displayChange"></image>
							</view>
						</view>
					</van-sticky>

					<!-- 加载框 -->
					<van-loading type="spinner" color="#1989fa" v-if="isContainer" />
					<!-- tab下展示的内容 -->
					<view class="container" v-else>
						<!-- bookBox组件 -->
						<Book-box v-show="isDisplay" v-for="item in itemLIst" :isPubDate="isPubDate" :isAddDate="isAddDate" :bookItem="item"
						 :key="item.itemId"></Book-box>
						<!-- bookBoxB组件 -->
						<Book-box-b v-show="!isDisplay" v-for="item in itemLIst" :bookItem="item" :key="item.itemId"></Book-box-b>
					</view>
				</van-tab>
				<van-tab title="最新上架">
					<!-- 加载框 -->
					<van-loading type="spinner" color="#1989fa" v-if="isContainer" />
					<!-- 最新上架内容 -->
					<view class="new" v-else>
						<block v-for="(item,index) in newItemLIst" :key="index">
							<view class="date" v-if="isDate[index]"> 
								{{item.date}}
							</view>
							<Book-box v-for="item in item.list" :isPubDate="isPubDate" :isAddDate="isAddDate" :bookItem="item"
							 :key="item.itemId"></Book-box>
						</block>
					</view>
				</van-tab>
			</van-tabs>

			<!-- <view class="pageShow" v-if="show" @click="toTop">
				<view>{{page}}</view>
				<view>{{totalPage}}</view>
			</view> -->
			
			<view @click="toTop">
				<van-circle :value="page/totalPage*100" size="60" class="pageShow" v-if="show" layer-color="#c1c1c1" stroke-width="6" fill="#ffffff" :color="gradientColor" :text="page+'/'+totalPage" />
			</view>

		</view>

		<!-- 底部tabbar -->
		<van-tabbar @change="onChange">
			<van-tabbar-item icon="search">搜本店</van-tabbar-item>
			<van-tabbar-item icon="apps-o">商品分类</van-tabbar-item>
			<van-tabbar-item icon="chat-o">联系卖家</van-tabbar-item>
			<van-tabbar-item icon="underway-o">动态</van-tabbar-item>
			<van-tabbar-item icon="shop-o">店铺详情</van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component
	} from "vue-property-decorator";
	import Dialog from "@/wxcomponents/vant/dist/dialog/dialog";
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	import BookBox from "@/pages/shop/components/bookBox.vue";
	import BookBoxB from "@/pages/shop/components/bookBoxB.vue";
	import {
		myRequest
	} from "@/utils/zgrequest.js"

	@Component({
		components: {
			BookBox,
			BookBoxB
		}
	})

	export default class Index extends Vue {
		private shopDetail: any = {}
		private totalPage: number = 0;
		private itemLIst: Array < any > = [];
		private dateList: Array < any > = [];
		private isDate: Boolean[] = [];
		private newItemLIst: Array < any > = [];
		private tabList: Array < any > = [{
				tab: "综合",
				img: "",
				orderType: "sort"
			},
			{
				tab: "上新",
				img: "",
				orderType: "newItem"
			},
			{
				tab: "价格",
				img: "/static/icon/排序.png",
				orderType: "price",
				orderModeDown: "desc",
				orderModeUp: "asc"
			},
			{
				tab: "出版",
				img: "/static/icon/排序.png",
				orderType: "pubDate",
				orderModeDown: "desc",
				orderModeUp: "asc"
			},
		];
		private currentIndex: number = 0;
		private j: number = 2;
		private k: number = 2;
		private show: Boolean = false;
		private isDisplay: Boolean = true;
		private page: number = 1;
		private shopId: number = 0;
		private listType: string = "all";
		private orderType: string = "sort";
		private orderMode: string = "desc";
		private isAddDate: Boolean = false;
		private isPubDate: Boolean = false;
		private isContainer: Boolean = true;
		private shopkeeperId:number = 0;
		private gradientColor: any={
		    '0%': '#b7ffd5',
			'50%': '#79ccff',
		    '100%': '#ff6a6a'
		}

		onLoad(options){
			this.shopId = options.shopId
			console.log(options)
			this.getShopDetail()
			this.getItemList(this.listType, this.orderType, this.orderMode, this.page)
		}
		// created() {
		// 	this.getShopDetail()
		// 	this.getItemList(this.listType, this.orderType, this.orderMode, this.page)
		// }

		onReachBottom() {
			this.page++;
			console.log('触底刷新，请求参数', this.listType, this.orderType, this.orderMode, this.page)
			this.getItemList(this.listType, this.orderType, this.orderMode, this.page);
		}

		onPageScroll(e) {
			if (e.scrollTop >= 200) {
				this.show = true
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

		displayChange(): void {
			this.isDisplay = !this.isDisplay
		}

		async getShopDetail(): Promise < any > {
			let res = await myRequest({
				method: "get",
				url: "/shop-front/mobile/ajax/getShopDetail",
				data: {
					shopId: this.shopId
				}
			})
			this.shopDetail = res.data
			this.shopkeeperId = res.data.shopkeeperId
			console.log(this.shopDetail)
			uni.setNavigationBarTitle({
			    title: this.shopDetail.shopName
			});
		}

		async getItemList(listType, orderType, orderMode, page): Promise < any > {
			let res = await myRequest({
				method: "get",
				url: "/shop-front/mobile/ajax/getItemList",
				data: {
					shopId: this.shopId,
					listType,
					orderType,
					orderMode,
					size: 10,
					page
				}
			})
			this.totalPage = res.data.pager.maxPage;
			// 判断请求到的数据是“全部商品”还是“最新上架”
			//包含data字段的是最新上架
			if ('date' in res.data.list[0]) {
				// 最新上架
				console.log("我是最新上架",page)
				if (page > 1) {
					this.newItemLIst = [...this.newItemLIst, ...res.data.list]
				} else {
					this.newItemLIst = res.data.list
				}
				res.data.list.forEach((item)=>{
					if(!this.dateList.includes(item.date)){
						this.isDate.push(true)
						// this.isDate = true;
					}else{
						this.isDate.push(false)
						// this.isDate = false;
					}
					this.dateList.push(item.date)
				})
			} else {
				// 全部商品
				if (page > 1) {
					this.itemLIst = [...this.itemLIst, ...res.data.list]
				} else {
					this.itemLIst = res.data.list
				}
			}
			this.isContainer = false
		}

		onTabChange(e): void {
			if (e.detail.title == "全部商品") {
				// 初始化请求参数all
				this.listType = "all";
				this.orderType = "sort";
				this.orderMode = "desc";
				this.page = 1;
				this.itemLIst = [];
				this.isContainer = true
				this.getItemList(this.listType, this.orderType, this.orderMode, this.page)
				this.isAddDate = false;
				this.isPubDate = false;
			} else {
				//初始化请求参数new
				this.listType = "new";
				this.orderType = "sort";
				this.orderMode = "desc";
				this.page = 1;
				this.isContainer = true
				this.newItemLIst = [];
				this.isDate = [];
				this.dateList = [];
				this.getItemList(this.listType, this.orderType, this.orderMode, this.page)
				this.isAddDate = false;
				this.isPubDate = true;
			}
		}

		switchSort(index, params): void {
			this.currentIndex = index
			this.isContainer = true
			if (index == 2) {
				this.k = 2;
				this.page = 1
				this.tabList[3].img = "/static/icon/排序.png"
				this.orderType = params.orderType
				if (this.j % 2 == 0) {
					this.tabList[2].img = "/static/icon/排序 (上).png"
					this.orderMode = params.orderModeUp
					this.getItemList(this.listType, this.orderType, this.orderMode, this.page);
				} else {
					this.tabList[2].img = "/static/icon/排序 (下).png"
					this.orderMode = params.orderModeDown
					this.getItemList(this.listType, this.orderType, this.orderMode, this.page);
				}
				this.isAddDate = false;
				this.isPubDate = false;
				this.j++;
			} else if (index == 3) {
				this.j = 2;
				this.page = 1;
				this.tabList[2].img = "/static/icon/排序.png"
				this.orderType = params.orderType
				console.log("出版排序", this.listType, this.orderType, this.orderMode, this.page)
				if (this.k % 2 == 0) {
					this.tabList[3].img = "/static/icon/排序 (上).png"
					this.orderMode = params.orderModeUp
					this.getItemList(this.listType, this.orderType, this.orderMode, this.page);
				} else {
					this.tabList[3].img = "/static/icon/排序 (下).png"
					this.orderMode = params.orderModeDown
					this.getItemList(this.listType, this.orderType, this.orderMode, this.page);
				}
				this.isAddDate = false;
				this.isPubDate = true;
				this.k++;
			} else {
				this.orderMode = "asc"
				this.j = this.k = 2
				this.tabList[2].img = this.tabList[3].img = "/static/icon/排序.png"
				this.orderType = params.orderType
				if (params.orderType == "sort") {
					this.isAddDate = false;
					this.isPubDate = false;
				} else {
					this.isAddDate = true;
					this.isPubDate = false;
				}
				this.page = 1
				this.getItemList(this.listType, this.orderType, this.orderMode, this.page);
				
				console.log("切换刷新", params.orderType)
			}
		}

		onDialog(): void {
			let msg:string = this.shopDetail.notice==''?this.shopDetail.shareIntro:this.shopDetail.notice
			Dialog.alert({
				title: '公告',
				message: msg,
				theme: 'round-button',
			}).then(() => {
				// on close
			})
		}
		onChange(event): void {
			// event.detail 的值为当前选中项的索引
			switch (event.detail) {
				case 0:
					uni.navigateTo({
						url: `/pages/shop/search/search?shopId=${this.shopId}`
					})
					break;
				case 1:
					uni.navigateTo({
						url: `/pages/shop/sort/sort?shopId=${this.shopId}`
					})
					break;
				case 2:
					uni.navigateTo({
						url: '/pages/shop/chat/chat'
					})
					break;
				case 3:
					uni.navigateTo({
						url: `/pages/shop/news/news?shopkeeperId=${this.shopkeeperId}`
					})
					break;
				case 4:
					uni.navigateTo({
						url: `/pages/shop/shopdetail/shopdetail?shopId=${this.shopId}`
					})
					break;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.van-loading {
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}

	/deep/.van-tabbar {
		z-index: 200;

		.van-icon {
			font-size: 50rpx !important;
		}
	}

	.main {
		position: relative;

		.top-card {
			padding: 30rpx 20rpx;
			position: relative;

			.cover {
				width: 120rpx;
				height: 120rpx;
				float: left;
				margin-right: 30rpx;
				margin-top: 5rpx;
			}

			.right-content {
				.title {
					font-size: 36rpx;
					color: #393939;
				}

				.icon {
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}

				.tips {
					view {
						display: inline-block;
						height: 36rpx;
						line-height: 36rpx;
						vertical-align: middle;
						font-size: 26rpx;
						padding-right: 10rpx;
						margin-right: 10rpx;
						border-right: 1px solid #c6c6c6;

						.dd {
							color: #393939;
							height: 36rpx;
							line-height: 36rpx;
							padding-left: 5rpx;
						}
					}

					view:last-child {
						border: 0;
					}

					color: #8b8b8b;
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

		/deep/.tab {
			.van-tab {
				font-size: 30rpx;
			}

			.van-tab--active {
				color: #b41d13;
			}

			.tab-sort {
				width: 750rpx;
				display: flex;
				justify-content: space-around;
				box-sizing: border-box;
				padding: 20rpx 0;
				border-top: 1px solid #dcdcdc;
				font-size: 30rpx;
				color: #6d6d6d;
				background-color: #fff;

				.active {
					color: #b41d13;
				}

				.mytab {
					text-align: center;
					display: inline-block;

					.sorticon {
						width: 32rpx;
						height: 32rpx;
						vertical-align: middle;
						transform: translateY(-10%);
					}

				}

				.mytab:nth-child(4) {
					padding-right: 40rpx;
					border-right: 1px solid #dcdcdc;
				}

				.item {
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.container {
				width: 750rpx;
				padding-bottom: 30rpx;
				background: linear-gradient(#fff, #e5e5e5);
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
			}

			.new {
				border-top: 1px solid #dcdcdc;
				width: 750rpx;
				padding-bottom: 30rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
				.date {
					padding: 40rpx 0 15rpx 0;
					color: #878787;
					font-size: 32rpx;
				}
			}
		}

		.pageShow {
			position: fixed;
			right: 50rpx;
			bottom: 130rpx;
		}
	}
</style>
