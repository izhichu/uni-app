<template>
	<view class="main">
		<view class="none" v-if="feedList.length == 0">
			<image src="/static/icon/void.png" mode=""></image>
		</view>
		
		<view class="box" v-for="item in feedList" :key="item.feedId" v-else>
			<view class="user">
				<image :src="item.userPic" class="pic"></image>
				<view class="right">
					<view class="title">
						{{item.nickname}}
					</view>
					<view class="date">
						{{item.postDateTime}}
					</view>
				</view>
			</view>
			<view class="content" v-html="item.content"></view>
			<view class="bottom">
				<text class="viewNum">
					{{item.viewNum}}阅读
				</text>
				<view class="likeList">
					<block v-for="(item,idx) in item.likeList" :key="item.userId">
						<image :src="item.userPic" v-if="idx<8"></image>
					</block>
				</view>
			</view>
		</view>
		
		<view class="box">
			<view class="tips">
				----------没有更多了----------
			</view>
		</view>

	</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component
	} from "vue-property-decorator";
	@Component({})
	export default class News extends Vue {
		private feedList: any = {};
		async onLoad(options) {
			console.log(options);
			const myRequest = () => {
				return new Promise((resolve, reject) => {
					uni.request({
						method: "GET",
						data: {
							userId: options.shopkeeperId,
							// userId: 1833904,
							type: 'text',
							size: 10,
							lastFeedId: 0
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						url: 'https://t.kongfz.com/api/getPersonalFeedList',
						success(res) {
							resolve(res.data)
						}
					})
				})
			}
			let res = await myRequest()
			uni.setNavigationBarTitle({
			    title: `${( < any > res).result.userInfo.nickname}的个人广场`
			});
			console.log(( < any > res).result)
			this.feedList = ( < any > res).result.feedList;
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 660rpx;
		margin: 0 auto;
		background-color: #ececec;
		.none{
			image{
				display: block;
				margin: auto;
			}
		}
		.box {
			margin-bottom: 25rpx;
			background-color: #fff;
			.user {
				padding: 25rpx 0;

				.pic {
					width: 100rpx;
					height: 100rpx;
					float: left;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.right {
					.title {
						font-size: 35rpx;
					}

					.date {
						font-size: 26rpx;
						color: #808080;
					}
				}
			}

			.content {
				margin: 30rpx 0;
			}

			.bottom:after {
				content: "";
				display: block;
				height: 0;
				clear: both;
				visibility: hidden;
			}

			.bottom {
				padding-bottom: 30rpx;
				.viewNum {
					float: left;
					color: #808080;
				}

				.likeList {
					float: right;
					display: inline-block;
					image {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}
			}
			
			.tips{
				font-size: 26rpx;
				color: #808080;
				text-align: center;
			}
		}
	}
</style>
