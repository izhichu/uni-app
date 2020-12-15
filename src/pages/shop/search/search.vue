<template>
	<view class="main">
		<van-search value="" placeholder="请输入搜索关键词" use-action-slot @clear="onClear" @change="onChange" @search="onSearch">
			<view slot="action" @tap="onClick">搜索</view>
		</van-search>
		<!-- tab分类排序 -->
		<van-sticky v-if="searchItem.length!=0">
			<view class="tab-sort">
				<view v-for="(item,index) in tabList" :key="item.tab" :class="{mytab:true,active: currentIndex == index}" @click="switchSort(index)">
					{{item.tab}}
					<image v-if="item.img !==''" :src="item.img" :class="{sorticon:true}"></image>
				</view>
				<view class="item">
					<image :src="isDisplay?'/static/icon/双列表.png':'/static/icon/单列表.png'" @click="displayChange"></image>
				</view>
			</view>
		</van-sticky>
		<!-- 搜索出来的内容 -->
		<view class="container" v-if="searchItem.length!=0">
			<!-- bookBox组件 -->
			<Book-box v-show="isDisplay" v-for="item in searchItem" :isPubDate="isPubDate" :isAddDate="isAddDate" :bookItem="item"
			 :key="item.id"></Book-box>
			<!-- bookBoxB组件 -->
			<Book-box-b v-show="!isDisplay" v-for="item in searchItem" :bookItem="item" :key="item.id"></Book-box-b>
			<van-loading size="24px" v-show="pageCurr<totalPage">加载中...</van-loading>

			<!-- 页数显示 -->
			<!-- <view class="pageShow" v-if="show" @click="toTop">
				<view>{{pageCurr}}</view>
				<view>{{totalPage}}</view>
			</view> -->
			
			<view @click="toTop">
				<van-circle :value="pageCurr/totalPage*100" size="60" class="pageShow" v-if="show" layer-color="#c1c1c1" stroke-width="6" fill="#ffffff" :color="gradientColor" :text="pageCurr+'/'+totalPage" />
			</view>
			
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component
	} from "vue-property-decorator";
	import {
		myRequest
	} from "@/utils/zgrequest.js"
	import BookBox from "@/pages/shop/components/bookBox.vue";
	import BookBoxB from "@/pages/shop/components/bookBoxB.vue";

	@Component({
		components: {
			BookBox,
			BookBoxB
		}
	})
	export default class Search extends Vue {
		private searchItem: any = [];
		private totalPage: number = 0;
		private pageCurr: number = 0;
		private isDisplay: Boolean = true;
		private isAddDate: Boolean = false;
		private isPubDate: Boolean = false;
		private isClear: Boolean = false;
		private show: Boolean = false;
		private j: number = 2;
		private k: number = 2;
		private currentIndex: number = 0;

		private key: string = "";
		private order: number = 0;
		private pagenum: number = 1;

		private tabList: Array < any > = [{
				tab: "综合",
				img: ""
			},
			{
				tab: "上新",
				img: ""
			},
			{
				tab: "价格",
				img: "/static/icon/排序.png"
			},
			{
				tab: "出版",
				img: "/static/icon/排序.png"
			},
		];
		private gradientColor: any={
		    '0%': '#b7ffd5',
			'50%': '#79ccff',
		    '100%': '#ff6a6a'
		}
		
		async getSearchItem(): Promise < any > {
			let res = await myRequest({
				method: "POST",
				url: "/shop-front/mobile/ajax/getSearchItem",
				data: {
					shopId: 19661,
					params: JSON.stringify({
						shopId: 19661,
						order: this.order,
						pagenum: this.pagenum,
						key: this.key
					})
				}
			})
			if (parseInt(res.data.page.total) <= parseInt(res.data.page.pageShow)) {
				this.totalPage = 1
			} else {
				this.totalPage = Math.ceil(res.data.page.total / res.data.page.pageShow)
			}
			this.pageCurr = res.data.page.pageCurr
			this.searchItem = [...this.searchItem, ...res.data.itemList]
			console.log("总页数:", this.totalPage, "当前页:", this.pageCurr, "请求第几页:", this.pagenum)
			console.log(res.data.itemList)
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
				duration: 500
			})
		}

		onClear():void{
			this.searchItem = [];
		}
		onChange(e): void {
			this.pagenum = 1
			this.key = e.detail
		}
		onSearch(): void {
			this.searchItem = [];
			this.getSearchItem()
		}
		onClick(): void {
			this.searchItem = [];
			this.getSearchItem()
		}
		
		onReachBottom() {
			if (this.pagenum < this.totalPage) {
				this.pagenum++;
				setTimeout(()=>{
					this.getSearchItem();
				}, 1000);
			}
		}

		displayChange(): void {
			this.isDisplay = !this.isDisplay
		}

		switchSort(index): void {
			this.currentIndex = index;
			this.isAddDate = false;
			this.isPubDate = false;
			this.searchItem = [];
			if (index == 2) {
				this.k = 2;
				this.tabList[3].img = "/static/icon/排序.png"
				this.pagenum = 1
				if (this.j % 2 == 0) {
					this.tabList[2].img = "/static/icon/排序 (上).png"
					this.order = 1
					console.log("价格上")
				} else {
					this.tabList[2].img = "/static/icon/排序 (下).png"
					this.order = 2
					console.log("价格下")
				}
				this.getSearchItem();
				this.isAddDate = false;
				this.isPubDate = false;
				this.j++;
			} else if (index == 3) {
				this.j = 2;
				this.tabList[2].img = "/static/icon/排序.png"
				this.pagenum = 1
				if (this.k % 2 == 0) {
					this.tabList[3].img = "/static/icon/排序 (上).png"
					this.order = 3
					console.log("出版上")
				} else {
					this.tabList[3].img = "/static/icon/排序 (下).png"
					this.order = 4
					console.log("出版下")
				}
				this.getSearchItem();
				this.isAddDate = false;
				this.isPubDate = true;
				this.k++;
			} else {
				this.j = this.k = 2
				this.tabList[2].img = this.tabList[3].img = "/static/icon/排序.png"
				this.pagenum = 1
				if (index == 0) {
					this.order = 0
					console.log("综合")
				} else {
					this.order = 6
					this.isAddDate = true;
					console.log("上新")
				}
				this.getSearchItem();
			}
		}

	}
</script>

<style lang="scss">
	.main {
		position: relative;

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

		.pageShow {
			position: fixed;
			right: 50rpx;
			bottom: 110rpx;
		}
	}
</style>
