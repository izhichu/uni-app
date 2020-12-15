<template>
	<view class="main">
		<image :src="bookItem.imgBig || bookItem.normalImg"></image>
		<view class="right-box">
			<view class="title">
				{{bookItem.itemName}}
			</view>
			<view class="desc">
				{{bookItem.author}}
			</view>
			<view class="desc" v-if="isAddDate">
				{{bookItem.addDate || bookItem.date}} 上书
			</view>
			<view class="desc" v-if="isPubDate">
				{{bookItem.pubDate}}
			</view>
			<view class="bottom">
				<text class="price">￥{{bookItem.price}}</text>
				<text class="tips">{{bookItem.quality}}</text>
				<text class="tips">快递11.00</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Prop
	} from "vue-property-decorator";
	@Component({})
	export default class BookBox extends Vue {
		@Prop(Object) private bookItem!: object;
		@Prop(Boolean) private isAddDate!: Boolean;
		@Prop(Boolean) private isPubDate!: Boolean;
	}
</script>

<style lang="scss">
	.main {
		width: 750rpx;
		height: auto;
		padding: 20rpx;
		margin-left: 40rpx;
		background-color: #fff;
		border-bottom: 1px solid #dcdcdc;
		position: relative;
		image {
			height: 220rpx;
			width: 220rpx;
			border-radius: 5px;
		}

		.right-box {
			width: 465rpx;
			height: 230rpx;
			overflow: hidden;
			display: inline-block;
			position: absolute;
			left: 260rpx;
			.title {
				width: 100%;
				overflow: hidden;
				/*必须结合的属性,当内容溢出元素框时发生的事情*/
				text-overflow: ellipsis;
				/*可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
				display: -webkit-box;
				/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
				-webkit-line-clamp: 2;
				/*用来限制在一个块元素显示的文本的行数。*/
				-webkit-box-orient: vertical;
				/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
				color: #515151;
				font-size: 30rpx;
			}
			.desc{
				font-size: 27rpx;
				color: #878787;
				margin-top: 10rpx;
			}
			.bottom{
				font-size: 24rpx;
				color: #9a9a9a;
				position: absolute;
				bottom: 0;
				.price{
					font-size: 35rpx !important;
					color: #b41d13 ;
				}
				.tips{
					padding: 0 10rpx;
					background-color: #f4f4f4;
					border-radius: 3px;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
