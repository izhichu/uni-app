<template>
	<view class="booklist" >
		<view class="booklistTitle">
			{{bookList.name}}
			<view class="more">
				更多>
			</view>
		</view>
		<view class="book" v-for="item in books" @click="toDetail(item.shopId,item.itemId)">
			<image :src="item.imgUrl"></image>
			<view class="price">
				￥{{item.price}}
			</view>
			<view class="bookInfo">
				<view class="bookName">
					{{item.itemName}}
				</view>
				<view class="writer" v-if="item.author!=undefined">
					{{item.author}}
				</view>
				<view class="bookIntro" v-if="item.importantDesc!=undefined">
					{{item.importantDesc}}
				</view>
				<view class="bookIntro" v-if="item.contentIntroduction!=undefined">
					{{item.contentIntroduction}}
				</view>
			</view>
		</view>
		
		<view class="change" @click="changeArr">
			换一换
			<image src="../static/icon/刷新%20终结版.png" mode=""></image>
		</view>

	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Prop
	} from "vue-property-decorator";
 
	@Component({

	})

	export default class bookList extends Vue {
		private books: Array < any >= [];
		@Prop({
			type: Object
		}) private bookList!:any;

		created() {
			this.books =( this.bookList.data[0].data).slice(0,3);
		}
	
		changeArr(): Array<any>{
			var length:number=this.bookList.data[0].data.length;
			var i:number=Math.floor(Math.random()*length  )
			if(i<=length-3){
				this.books =( this.bookList.data[0].data).slice(i,i+3);
			}else {
				i=i-3
				}
			return this.books
			
		       
		}
		toDetail(shopId,itemId) {
			console.log(itemId,shopId)
			uni.navigateTo({
			    url: `/pages/bookDetail/bookDetail?itemId=${itemId}&shopId=${shopId}`
			});
		}
	}
	

	
</script>

<style scoped>
	.booklist {
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		margin-top: 20rpx;
		padding-top: 30rpx;
	}

	.booklistTitle {
		margin-bottom: 30rpx;
		width: 95%;
		font-family: STFangsong;
		font-size: 38rpx;
		font-weight: bolder;

	}

	.more {
		position: absolute;
		top: 30rpx;
		right: 10rpx;
		font-size: 24rpx;
		font-family: none;
		font-weight: 400;
		color: #909090;
	}

	.book {
		width: 95%;
		display: flex;
		margin-top: 30rpx;
	}

	.book image {
		width: 25%;
		height: 200rpx;
	}

	.bookInfo {
		width: 70%;
		padding-left: 30rpx;
		height: 260rpx;
		border-bottom: 0.5rpx solid #f1f1f1;
	}

	.bookName {
		font-size: 30rpx;
		margin-bottom: 20rpx;
		font-weight: 600;
		height: 45rpx;
		overflow: hidden;
	}

	.writer {
		font-size: 26rpx;
		/* 		margin-bottom: 20rpx; */
		font-weight: 500;
		overflow: hidden;
		height: 75rpx;
	}

	.bookIntro {
		font-size: 26rpx;
		color: #909090;
		overflow: hidden;
		height: 75rpx;
	}

	.price {
		position: absolute;
		background-color: #b41d13;
		color: #FFFFFF;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		padding: 0 26rpx;
		border-top-right-radius: 25rpx;
		border-bottom-right-radius: 20rpx;
		opacity: 0.8;
		transform: translateY(160rpx);
	}
	
	.change{
		height: 80rpx;
		font-size: 24rpx;
		line-height: 80rpx;
		color: #003671;
	}
	.change image{
		width: 24rpx;
		height: 24rpx;
		transform: translateY(4rpx);
		margin-left: 13rpx;
	}
</style>
