<template>
	<view class="content">

		<view class="toTop" @click="toTop" v-if="show">
			<view class="sword">
				︿
			</view>
			<view class="font">
				顶部
			</view>
		</view>

		<view class="searchBox">
			<image :src="userImg" mode="" class="logo" @click="ToLogin"></image>
			<view class="search" @click="ToSearch">
				<image src="../../static/icon/search.png" mode=""></image>
				<input disabled="disabled" type="text" value="" placeholder="商品名称 作者 出版社 ISBN"></input>
			</view>
			<image src="../../static/icon/message.png" mode="" class="message"></image>
		</view>
		<view class="header">
			<view class="swiper">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" circular="true">
					<swiper-item v-for="item in swipers" :key="item.confId">
						<view class="swiper-item">
							<image :src="item.imgUrl"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="menus">
				<view class="menu" @click="toList(8000000000000000)" :title="'线装古籍'">
					<image src="https://img0.kfzimg.com/operation/37/04/3704e889c9bf128f0885b56aff3e139f.png" mode=""></image>
					<text>线装古籍</text>
				</view>
				<view class="menu" @click="toList(9000000000000000)">
					<image src="https://img0.kfzimg.com/operation/2a/16/2a160cbf488782342afa5ca7c08d6b16.png" mode=""></image>
					<text>民国旧书</text>
				</view>
				<view class="menu" @click="toList(21000000000000000)">
					<image src="https://img0.kfzimg.com/operation/70/4a/704af39433730039bce141f312674ea3.png" mode=""></image>
					<text>名人墨迹</text>
				</view>
				<view class="menu" @click="toList(58000000000000000)">
					<image src="https://img0.kfzimg.com/operation/b4/cd/b4cd48f2f8adfa4ba92271061e1292bc.png" mode=""></image>
					<text>古玩杂项</text>
				</view>
				<view class="menu" @click="ToAllCategories">
					<image src="https://img0.kfzimg.com/operation/d3/71/d371a223d9c055abf993c068520117c7.png" mode=""></image>
					<text>全部分类</text>
				</view>
			</view>


			<view class="recommends">
				<view class="recommend" @click="ToNewBook">
					<view class="recommendText">
						<view class="title">新书频道</view>
						<view class="info">发现孔网新书</view>
					</view>
					<image src="https://img0.kfzimg.com/operation/81/ae/81ae33f2ce1d23818c64b917e9780269.png"></image>
				</view>

				<view class="recommend">
					<view class="recommendText">
						<view class="title">藏书单</view>
						<view class="info">为你推荐好书</view>
					</view>
					<image src="https://img0.kfzimg.com/operation/af/e6/afe651e4767bf0c94b7d53275c061831.png"></image>
				</view>
			</view>
		</view>

		<carousel :img-list="bookList" url-key="imgUrl" :listCount="listCount" />
		</carousel>
		<bookList v-for="item in bookLists" :key="item.confId" :bookList="item"></bookList>
		<bookSwiper v-for="item in bookSwipers" :key="item.confId" :bookSwiper="item"></bookSwiper>
		<view class="bookForyou">
			<view class="bookForyouTitle">
				为你推荐
			</view>
			<view class="bookForyouBooks">
				<view class="bookForyouBook" v-for="item in books" @click="toDetail(item.itemId,item.shopId)">
					<image :src="item.imgBig"></image>
					<view class="bookForyouName">
						{{item.itemName}}
					</view>
					<view class="bookForyouInfo">
						<text class="bookForyouOld">{{item.quality}}</text>
						<text class="bookForyouPlace">{{item.area}}</text>
					</view>
					<view class="bookForyouPrice">
						{{item.price}}
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
	} from "vue-property-decorator"
	import uniBadge from "@/components/uni-ui/lib/uni-badge/uni-badge.vue";
	import uniSearchBar from "@/components/uni-ui/lib/uni-search-bar/uni-search-bar.vue";
	import {
		myRequest
	} from '@/utils/zgrequest.js';
	import bookList from "../../components/bookList.vue";
	import bookSwiper from "../../components/bookSwiper.vue";
	import carousel from "../../components/vear-carousel/vear-carousel.vue"

	@Component({
		components: {
			uniBadge,
			bookList,
			bookSwiper,
			carousel
		}
	})


	export default class Index extends Vue {
		private swipers: Array < any >= []
		private menus: Array < any >= []
		private recommends: Array < any >= []
		private bookLists: Array < any >= []
		private bookSwipers: Array < any >= []
		private books: Array < any >= []
		private place: any = 1;
		private show: Boolean = false;
		private bookList: Array < any >= []
		private userImg: String = "";
		private listCount: Number = 0;
		private title:String=""


		created() {
			this.getSwipers();
			this.getMenus();
			this.getRecommends();
			this.getBookLists();
			this.getBookSwipers();
			this.getForyou();
			this.getStorage();

		}
		beforeUpdate() {

		}
		getStorage() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log("获取内存成功", this, res.data.userInfo.avatarUrl)
					this.userImg = res.data.userInfo.avatarUrl
				}
			});

		}
		onPageScroll(e) {
			if (e.scrollTop > 1000) {
				this.show = true;
			} else {
				this.show = false
			}
		}

		/* 书籍轮播图 */
		async getSwipers(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getLunbo?datasource=18'
			})
			this.swipers = res.result
		}

		/* 书籍菜单 */
		async getMenus(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getLunbo?datasource=21'
			})
			this.menus = res.result
		}

		/* 书籍推荐模块 */
		async getRecommends(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getIndexSquare?currPage=1'
			})
			this.recommends = res.result.list[1].data
		}

		/* 书单与书籍列表 */
		async getBookLists(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getIndexSquare?currPage=3'
			})
			const res2 = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getIndexSquare?currPage=4'
			})
			this.bookLists = ((res.result.list).slice(1)).concat((res2.result.list).slice(0, 2));
			this.bookList = res.result.list[0].data;
			this.listCount = res.result.list[0].count;
		}

		/* 书籍scroll-view */
		async getBookSwipers(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getIndexSquare?currPage=4'
			})
			const res2 = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getIndexSquare?currPage=5'
			})
			this.bookSwipers = ((res.result.list).slice(2, 3)).concat((res2.result.list).slice(0, 3))
		}

		/* 为你推荐 */
		onReachBottom() {
			this.place++
			console.log(this.place)
			this.getForyou();
		}
		async getForyou(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/book/mobile/ajax/getRecommendItems?place=' + this.place
			})
			this.books = (this.books).concat(res.data)
		}
		toTop(): void {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 1000
			})
		}
		ToLogin() {
			uni.navigateTo({
				url: "/pages/login/login",
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
		toDetail(a, b) {
			uni.navigateTo({
				url: `/pages/bookDetail/bookDetail?itemId=${a}&shopId=${b}`
			});
		}
		ToSearch() {
			console.log("丢你雷姆")
			uni.navigateTo({
				url: "/pages/search/search",
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
		ToNewBook() {
			uni.navigateTo({
				url: "/pages/newBook/newBook"
			});
		}
		onNavigationBarSearchInputClicked() {
			this.ToSearch()
		}
		ToAllCategories() {
			uni.navigateTo({
				url: "/pages/allCategories/allCategories",
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
		toList(id) {
			uni.navigateTo({
				url: `/pages/List/List?catId=${id}`
			})
		}

	}
</script>


<style lang="scss" scoped>
	.searchBox {
		height: 110rpx;
		width: 100%;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		position: fixed;
		top: 0rpx;
		z-index: 1;
	}

	.search input {
		height: 50rpx;
		margin-left: 10rpx;
	}

	.search image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
		transform: translateY(7rpx);
	}

	.search {
		width: 560rpx;
		height: 50rpx;
		border: 2rpx solid #B41D13;
		border-radius: 25rpx;
		margin: 25rpx 20rpx 0 20rpx;
		display: flex;

	}


	.logo,
	.message {
		width: 50rpx;
		height: 50rpx;
		margin-top: 25rpx;
		border-radius: 50%;
	}

	.swiper {
		width: 95%;
		height: 280rpx;
		margin-top: 110rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.swiper-item {
		width: 100%;
		height: 280rpx;
		border-radius: 15rpx;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}

	.menus {
		width: 95%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 25rpx;
		display: flex;
		justify-content: space-evenly;
		font-size: 23rpx;
	}

	.menu {
		width: 19%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
	}

	image {
		width: 90rpx;
		height: 90rpx;
		margin-bottom: 10rpx;
	}

	.recommends {
		width: 95%;
		height: 170rpx;
		display: flex;
		justify-content: space-evenly;
	}

	.recommend {
		width: 49%;
		height: 150rpx;
		background-color: #f9f9f7;
		display: flex;
	}

	.recommendText {
		width: 58%;
		height: 150rpx;
	}

	.title {
		font-family: STFangsong;
		font-weight: bolder;
		font-size: 35rpx;
		text-align: center;
		margin-top: 20rpx;
	}

	.info {
		font-size: 26rpx;
		color: 909090;
		text-align: center;
		margin-top: 20rpx;
	}

	.recommend image {
		width: 150rpx;
		height: 150rpx;
	}


	.header {
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;

	}

	.content {
		background-color: #efefee;
		height: auto;
		padding-bottom: 20rpx;
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
	}

	.bookForyouTitle {
		padding-bottom: 20rpx;
		width: 100%;
		padding-left: 5%;
		font-family: STFangsong;
		font-size: 38rpx;
		font-weight: bolder;
		background: linear-gradient(#ffffff, #f3f3f3);
		box-sizing: border-box;
	}

	.bookForyouBooks {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		background-color: #f3f3f3;

	}

	.bookForyouBook {
		width: 345rpx;
		height: 550rpx;
		background-color: #ffffff;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 15rpx;
	}

	.bookForyouBook image {
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
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}

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

	.bookForyouPrice {
		width: 90%;
		color: #b41d13;
		font-size: 26rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
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
	}

	.sword {
		font-size: 30rpx;
		transform: translateY(-10rpx);

	}

	.font {
		font-size: 24rpx;
		transform: translateY(-10rpx);
	}
</style>
