<template>
	<view class="allCategories">
		<view class="classes">
			<view class="class "><text>特色</text></view>
			<view class="class cleacted"><text>图书</text></view>
			<view class="class"><text>艺术收藏</text></view>
			<view class="class"><text>文创周边</text></view>
		</view>

		<view class="sonOfClass">

		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator";
	@Component({})

	export default class allCategories extends Vue {

	}
</script>

<style>
	.allCategories {
		display: flex;
		background-color: #efefee;
		width: 100%;
		height: 2000rpx;
	}

	.classes {
		width: 26%;
		background-color: #efefee;
		position: fixed;


	}

	.class {
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		color: #909090;
		font-size: 28rpx;
	}

	.cleacted {
		background-color: #FFFFFF;
		color: #b41d13;
		z-index: 10;
		border-left: 4rpx solid #b41d13;
		font-size: 28rpx;
	}

	.sonOfClass {
		width: 74%;
		height: 2000rpx;
		position: absolute;
		background-color: #FFFFFF;

		right: 0;
	}
</style>
