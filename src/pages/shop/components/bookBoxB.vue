<template>
	<view class="main">
		<image :src="bookItem.imgBig || bookItem.normalImg"></image>
		<view class="bottom">
			<view class="title">
				{{bookItem.itemName}}
			</view>
			<view class="price">￥{{bookItem.price}}</view>
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
	export default class BookBoxB extends Vue {
		@Prop(Object) private bookItem!: object;
	}
</script>

<style lang="scss">
	.main {
		width: 340rpx;
		height: 550rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 5px;
		border-bottom: 1px solid #dcdcdc;
		position: relative;
		box-shadow: 0 5px 5px 0px #999999;
		image {
			width: 100%;
			height: 380rpx;
			border-radius: 5px 5px 0 0;
		}
		.bottom{
			width: 310rpx;
			padding: 20rpx 0;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			.title {
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
			.price{
				margin-top: 10rpx;
				color: #b41d13;
			}
		}

		

	}
</style>
