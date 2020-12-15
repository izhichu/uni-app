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
				<input type="text" value=""  placeholder="商品名称 作者 出版社 ISBN"></input>
			</view>
			<image src="../../static/icon/message.png" mode="" class="message"></image>
		</view>
		<view class="header">
			<!-- 第一个轮播图 -->
			<view class="swiper">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" circular="true">
					<swiper-item v-for="item in swipers" :key="item.confId">
						<view class="swiper-item">
							<image :src="item.imgUrl"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="types">
				<view class="type" v-for="item in types">
					<image :class="typeImg" :src="item.imgUrl"></image>
					<view class="typeName">
						{{item.description}}
					</view>
				</view>
				
				
			</view>

			

			
		</view>
		
		<bookList v-for="item in bookLists" :key="item.confId" :bookList="item"></bookList>
		
		
		<view class="bookForyou">
			<view class="bookForyouTitle">
				为你推荐
			</view>
			<view class="bookForyouBooks">
				<view class="bookForyouBook" v-for="item in books" @click="toDetail(item.itemId,item.shopId)>
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


	export default class n extends Vue {
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
		private types:Array<any>=[]


		created() {
			this.getSwipers();

			this.getBookLists();

			this.getForyou();
			this.getStorage();
			this.getTypes()

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
				url: '/operation/mobile/ajax/getChannelLunbo?channelId=1097&datasource=18'
			})
			this.swipers = res.result
		}
		async getTypes(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getChannelLunbo?channelId=1097&datasource=21'
			})
			
			this.types = res.result
			// console.log(this.types)
		}



		/* 书单与书籍列表 */
		async getBookLists(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getChannelSquare?channelId=1097&currPage=1'
			})
		
			this.bookLists = res.result.list
			this.bookList = res.result.list[0].data;
			this.listCount = res.result.list[0].count;
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
				url: '/book/mobile/ajax/getRecommendItems?place=18' + this.place
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
		ToSearch() {
			console.log("丢你雷姆")
			uni.navigateTo({
				url: "/pages/search/search",
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
		ToNewBook(){
			uni.navigateTo({
				url:"/pages/newBook/newBook"
			});
		}
		onNavigationBarSearchInputClicked(){
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
		toDetail(a, b) {
			uni.navigateTo({
				url: `/pages/bookDetail/bookDetail?itemId=${a}&shopId=${b}`
			});
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
	.search input{
		height: 50rpx;
		margin-left: 10rpx;
	}
	.search image{
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
		transform: translateY(7rpx);
	}
	.search {
		width: 560rpx;
		height: 50rpx;
		border:2rpx solid  #B41D13;
		border-radius:25rpx;
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
	
	.types{
		margin-top: 40rpx;
		width: 90%;
		height: 370rpx;
		// background-color:#003671;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	.type{
		width: 120rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.typeName{
		font-size: 28rpx;
		color: #909090;
	}
	.typeImg{
		width: 100rpx;
		height: 130rpx;
	}
</style>
