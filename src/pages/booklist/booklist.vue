<template>
	<view class="content">
		<navigator open-type="navigateBack" />
		<view class="bookListItem" v-for="item in bookList" :key=item.id>
			<image :src="item.imgUrl" mode=""></image>
			<view class="info">
				{{item.description}}
			</view>
			<view class="more">
				<view class="read">
					· {{item.apv}}阅读
				</view>
				<view class="pic" v-for="item in item.likeInfo.recentUserPic" :key=item.id>
					<image :src="item"></image>
				</view>
				<view class="people">
					{{item.likeInfo.likeNum}}人
				</view>
				<uni-icons :type="isLike ? 'hand-thumbsup':'hand-thumbsup-filled'" :color="isLike ? '':'red'" size="20" @click="changeLike()"></uni-icons>
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
	import uniIcons from "@/components/uni-ui/lib/uni-icons/uni-icons.vue";
	import {
		myRequest
	} from '@/utils/zgrequest.js'

	@Component({
		components: {
			uniIcons
		}
	})
	export default class Index extends Vue {
		private bookList: Array < any > = []
		private isLike: Boolean = true
		created() {
			this.getBookList();
		}
		changeLike(){
			if (this.isLike == true) {
				uni.showToast({
					title: '点赞成功'
				})
				this.isLike=!this.isLike;
			} else {
				uni.showToast({
					title: '亲，您已经给我点过赞了哦！为其他节目或内容仍然可以点赞哦！'
				});
			}
		}
		async getBookList(): Promise < any > {
			const res = await myRequest({
				method: 'GET',
				url: '/operation/mobile/ajax/getBookList?currPage=1'
			})
			this.bookList = res.result.list;
			console.log(res.result.list, "书单列表")
		}
	}
</script>

<style lang="scss">
	.content {
		.bookListItem {
			width: 700rpx;
			height: 520rpx;
			border-radius: 10rpx;
			border: 1px solid rgb(245, 245, 245);
			margin: 0 auto;

			image {
				width: 700rpx;
				height: 350rpx;
				border-radius: 10rpx 10rpx 0 0;
			}

			.info {
				color: rgb(113, 113, 113);
				font-size: 28rpx;
				margin-top: 20rpx;
				margin-left: 15rpx;
			}

			.more {
				margin-left: 15rpx;
				margin-top: 20rpx;
				display: flex;
				align-items: center;

				.read {
					flex: 5;
					font-size: 25rpx;
					color: rgb(190, 190, 190);
				}

				.pic {
					flex: 1;

					// margin-left: 20rpx;
					image {
						height: 50rpx;
						width: 50rpx;
						border-radius: 50%;
					}
				}

				.people {
					font-size: 25rpx;
					flex: 1;
				}

				uni-icons {
					flex: 1;
				}
			}
		}
	}
</style>
