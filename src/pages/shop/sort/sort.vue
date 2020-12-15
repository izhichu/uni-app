<template>
	<view class="main" v-if="storeNav.total != undefined">
		<view class="box">
			<view class="title">
				全部商品({{storeNav.total}})
			</view>
		</view>

		<view class="box">
			<view class="title repeat">
				专题
			</view>
			<view class="content">
				<view class="sort" v-for="item in bookSort[0]" :key="item.specialId">
					{{item.specialName}}({{item.itemNum}})
				</view>
			</view>
		</view>

		<view class="box">
			<view class="title repeat">
				本店分类
			</view>
			<view class="content">
				<view class="sort" v-for="item in bookSort[1]" :key="item.catId">
					{{item.catName}}({{item.total}})
				</view>
			</view>
		</view>

		<view class="box">
			<view class="title repeat">
				孔网分类
			</view>
			<block v-for="item in bookSort[2]" :key="item.order">
				<view class="tips">
					{{item.name}}
				</view>
				<view class="content">
					<view class="sort" v-for="item in item.list" :key="item.catId">
						{{item.name}}({{item.total}})
					</view>
				</view>
			</block>
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
	@Component({})
	export default class Sort extends Vue {
		private storeNav: any = {}
		private bookSort: any = []
		async onLoad(options): Promise < any > {
			let res = await myRequest({
				method: "POST",
				url: "/shop-front/mobile/ajax/getStoreNav",
				data: {
					shopId: options.shopId
				}
			})
			this.storeNav = res.data
			for (let key in this.storeNav) {
				if (this.storeNav[key] instanceof Array) {
					this.bookSort.push(this.storeNav[key])
				}
			}
			console.log(this.storeNav)
			console.log(this.bookSort)
		}
	}
</script>

<style lang="scss">
	.main {
		background-color: #f3f3f3;
		padding: 0.1rpx;

		.repeat {
			margin-bottom: 20rpx;
		}

		.box {
			width: 700rpx;
			margin: 20rpx auto;
			background-color: #fff;
			border-radius: 5px;
			padding: 30rpx;
			box-sizing: border-box;

			.title {
				color: #444444;
			}

			.tips {
				font-size: 25rpx;
				color: #808080;
				margin: 20rpx 0;
			}
			.content {
				width: 640rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				position: relative;
				.sort {
					background-color: #f3f3f3;
					width: 315rpx;
					border-radius: 3px;
					margin-bottom: 10rpx;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #555555;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
