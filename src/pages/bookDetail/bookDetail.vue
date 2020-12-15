<template>
	<view>
		<view class="top">
			<uni-swiper-dot :info="info" :current="current" field="null" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in iteminfo" :key="index">
						<image class="swipe-img" :src="item.big"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="jieshao">
			<view class="koubei">
				<text class="koubei-1">孔网</text>
				<text class="koubei-2">18年口碑品牌 |</text>
				<text class="koubei-3">15万电偶入住 |</text>
				<text class="koubei-4">10万日销图书 </text>
				<text class="koubei-5">></text>
			</view>
			<view class="content">
				<view class="content-1">
					<view class="content-1-left">
						<text class="content-tag">自营</text>
						<text class="content-name">{{main.itemName}}</text>
					</view>
					<view class="content-1-right">
						<uni-icons type="heart" size="26" :color="isColor?'red':''"></uni-icons>
						<text class="collect" @click="collect">收藏</text>
					</view>
				</view>
				<view class="content-2">
					<text>{{main.importantDesc.c}}</text>
				</view>
				<view class="content-3">
					<text class="xianjia">￥{{main.price}}</text>
					<text class="zhekou" v-if="main.discountVal">{{main.discountVal}}折</text>
					<text class="yuanjia">￥{{main.oriPrice}}</text>
					<text class="leibie">{{main.quality.c}}</text>
				</view>
				<view class="content-4">
					<text>{{main.stock}}</text>
				</view>
			</view>
		</view>
		<view class="kuaidi">
			<view class="diqu">
				<text class="diqu-1">{{main.productArea}}送至</text>
				<text class="diqu-2">江苏省苏州市</text>
				<text class="diqu-3">卖家承担运费</text>
			</view>
			<view class="huodong">
				<text class="huodong-1">{{mail.shortTitle.n}}</text>
				<text class="huodong-2">{{mail.shortTitle.c}}</text>
				<text class="huodong-3">></text>
			</view>
			<view class="baozhang" @click="open">
				<text class="baozhang-1">孔网保障</text>
				<text class="baozhang-2">|</text>
				<text class="baozhang-3">认证卖家 · 担保交易 · 快速发货 · 售后保障</text>
				<text class="baozhang-4">></text>
			</view>
		</view>
		<view class="chuban">
			<view class="chuban-1" v-for="item in main.fieldList">
				<text class="chuban-1-1">{{item.n}}</text>
				<text class="chuban-1-2">{{item.c}}</text>
			</view>
		</view>
		<view class="pinjia">
			<view class="pinjia-1">
				<text class="pinjia-1-left">评价（{{pinlun.reviewAll}}）</text>
				<text class="pinjia-1-right">{{pinlun.goodReviewRate}}</text>
			</view>
			<view class="pinjia-2">
				<text class="pinlun-2-top">最新评论</text>
				<view class="pinlun-2-mid">
					<image class="touxiang" :src="pinlun.recentReview.appraiserUserPic"></image>
					<text class="pinjia-name">{{pinlun.recentReview.appraiserNickname}}</text>
					<view class="zan">
						<uni-icons type="hand-thumbsup" color="#b41d13"></uni-icons>
						<text>好评</text>
					</view>
				</view>
				<text class="pinlun-2-bottom">{{pinlun.recentReview.content.c}}</text>
			</view>
		</view>
		<view class="dianpu">
			<view class="dianpu-top">
				<view class="dianpu-top-1">
					<view class="dianpu-top-1-left">
						<image :src="shop.userPic"></image>
					</view>
					<view class="dianpu-top-1-right">
						<view class="right-1">
							<text class="right-1-1">{{shop.shopName}}</text>
							<text class="right-1-2">{{shop.openedYearsSlogan}}</text>
						</view>
						<view class="right-2">
							<uni-icons type="star-filled" size="16" color="skyblue"></uni-icons>
							<uni-icons type="star-filled" size="16" color="skyblue"></uni-icons>
							<uni-icons type="star-filled" size="16" color="skyblue"></uni-icons>
						</view>
						<view class="right-3">
							<text class="right-3-1">已实名</text>
							<text class="right-3-2">已认证</text>
							<text class="right-3-3">收藏店铺</text>
							<text class="right-3-4" @click="toShop(shop.shopId)">进店</text>
						</view>
					</view>
				</view>
				<view class="dianpu-top-2">
					<view class="bottom-1">
						<text>{{shop.successOrder.n}}</text>
						<text>{{shop.shippingTimeAvg.n}}</text>
						<text>好评率</text>
					</view>
					<view class="bottom-2">
						<text>{{shop.successOrder.c}}</text>
						<text>{{shop.shippingTimeAvg.c}}</text>
						<text>{{pinlun.goodReviewRate}}</text>
					</view>
				</view>
			</view>
			<view class="dianpu-mid">
				<text>最新上架</text>
			</view>
			<view class="dianpu-bottom">
				<view class="new-book" v-for="item in newBook">
					<image :src="item.imgSmall"></image>
					<view class="new-name">{{item.itemName}}</view>
					<view class="new-price">{{item.price}}</view>
				</view>
			</view>
		</view>
		<view class="goods-detail">
			<view class="detail-top">
				<view class="detail-line1"></view>
				<view class="detail-text">商品详情</view>
				<view class="detail-line2"></view>
			</view>
			<view class="detail-post">
				<image src="../../static/post.png"></image>
			</view>
			<view class="detail-content">
				<view class="miaoshu">
					<text>{{main.quality.n}}描述：{{main.quality.c}}</text>
				</view>
				<view class="neirong">
					<view class="neirong-1">
						<text>{{main.itemDesc.n}}</text>
					</view>
					<view class="neirong-2" v-html="main.itemDesc.c"></view>
				</view>
			</view>
		</view>
		<view class="goods-img">
			<image v-for="item in main.imgList" :src="item.big"></image>
		</view>
		<view class="goods-same">
			<view class="same-top">
				<view class="same-line1"></view>
				<view class="same-text">相似商品</view>
				<view class="same-line2"></view>
			</view>
			<view class="same-content">
				<view class="same-single" v-for="item in same">
					<image class="single-img" :src="item.imgBig"></image>
					<text class="single-jieshao">{{item.itemName}}</text>
					<view class="single-type">
						<text class="single-t">{{item.quality}}</text>
						<text class="single-add">{{item.area}}</text>
					</view>
					<text class="single-price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<view class="goods-tuijian">
			<view class="tuijian-top">
				<view class="tuijian-line1"></view>
				<view class="tuijian-text">为你推荐</view>
				<view class="tuijian-line2"></view>
			</view>
			<view class="tuijian-content">
				<view class="same-single" v-for="item in tuijian">
					<image class="single-img" :src="item.imgBig"></image>
					<text class="single-jieshao">{{item.itemName}}</text>
					<view class="single-type">
						<text class="single-t">{{item.quality}}</text>
						<text class="single-add">{{item.area}}</text>
					</view>
					<text class="single-price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<view class="no-more">
			<view class="tuijian-line1"></view>
			<view class="tuijian-text">没有更多了</view>
			<view class="tuijian-line2"></view>
		</view>
		<view class="back-top" v-if="scrollDistance>700" @click="backTop">
			<uni-icons type="arrowup" size="28" color="gray"></uni-icons>
			<text class="bk-txt">顶部</text>
		</view>
		<view class="popup-1">
			<uni-popup ref="popup" type="bottom">
				<view class="popup-1-all">
					<view class="pop-top">
						<text class="pop-biaoti">孔夫子旧书网交易保障</text>
						<uni-icons type="closeempty" size="24" color="gray" @click="close"></uni-icons>
					</view>
					<view class="pop-content">
						<view class="pop-jieshao">
							<view class="pop-jieshao-1">
								<uni-icons type="person-filled" color="#b41d13"></uni-icons>
								<text class="pop-jieshao-1-1">认证卖家</text>
							</view>
							<view class="pop-jieshao-2">孔网卖家必须进行实名认证或企业资质认证，若产生的交易与事实不符，可追责到个人。</view>
						</view>
						<view class="pop-jieshao">
							<view class="pop-jieshao-1">
								<uni-icons type="star-filled" color="#b41d13"></uni-icons>
								<text class="pop-jieshao-1-1">担保交易</text>
							</view>
							<view class="pop-jieshao-2">买家交易付款到孔网中介保护账户，等买家确认收货后，货款才会打到卖家资金账户。</view>
						</view>
						<view class="pop-jieshao">
							<view class="pop-jieshao-1">
								<uni-icons type="locked-filled" color="#b41d13"></uni-icons>
								<text class="pop-jieshao-1-1">快速发货</text>
							</view>
							<view class="pop-jieshao-2">卖家承认快速发货，最长不超过3天，若规定时间内未发货，则需要支付买家违约金。</view>
						</view>
						<view class="pop-jieshao">
							<view class="pop-jieshao-1">
								<uni-icons type="headphones" color="#b41d13"></uni-icons>
								<text class="pop-jieshao-1-1">售后保障</text>
							</view>
							<view class="pop-jieshao-2">购买的商品与卖家描述不符的，买家可申请退货退款或协商一致获得最高书款30%比例的补偿。</view>
						</view>
						<view class="iknow" @click="close">我知道了</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view style="width: 100%;height: 60px;"></view>
		<view class="foot">
			<uni-goods-nav :fill="false" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue"
	import uniGoodsNav from '@/components/uni-ui/lib/uni-goods-nav/uni-goods-nav.vue'
	import uniIcons from "@/components/uni-ui/lib/uni-icons/uni-icons.vue"
	import uniPopup from '@/components/uni-ui/lib/uni-popup/uni-popup.vue'

	import {
		myRequest
	} from "@/utils/zgrequest.js"

	export default {
		data() {
			return {
				itemId: '',
				shopId: '',
				main: '',
				scrollDistance: "",
				iteminfo: "",
				pinlun: '',
				mail: '',
				shop: '',
				same: '',
				tuijian: '',
				newBook: '',
				current: 0,
				mode: 'nav',
				isColor:'',
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'chat',
					text: '联系'
				}, {
					icon: 'cart',
					text: '购物车'
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#d48c68',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#b41d13',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			onLoad(options) {
				this.itemId = options.itemId;
				this.shopId = options.shopId;
				console.log(options, "xxxxxxxxxxx")
				this.getDetailMsg();
				this.getDetailPinlun();
				this.getDetailMail();
				this.getDetailBookshop();
				this.getDetailSame();
				this.getDetailTuijian();
				this.getDetailNew();
			},
			async getDetailMsg() {
				console.log(this.shopId, this.itemId, "9999999999999999999");
				const res = await myRequest({
					method: 'GET',
					url: `/book/mobile/ajax/getItemInfo?shopId=${this.shopId}&itemId=${this.itemId}`
				})
				this.main = res.data.itemInfo;
				this.iteminfo = res.data.itemInfo.imgList.slice(0, 5);
				
			},
			async getDetailPinlun() {
				const res = await myRequest({
					method: 'GET',
					url: '/xinyu/mobile/ajax/getShopReview4Detail?userId=2292046'
				})
				this.pinlun = res.data;
			},
			async getDetailMail() {
				const res = await myRequest({
					method: 'GET',
					url: '/book/mobile/ajax/getPromotionInfo?area=1001000000&shopId=19661'
				})
				this.mail = res.data;
			},
			async getDetailBookshop() {
				const res = await myRequest({
					method: 'GET',
					url: '/shop-front/mobile/ajax/getShopInfo?shopId=19661'
				})
				this.shop = res.data;
			},
			async getDetailSame() {
				const res = await myRequest({
					method: 'GET',
					url: `/book/mobile/ajax/getSimilarItems?shopId=${this.shopId}&itemId=${this.itemId}`
				})
				this.same = res.data;
			},
			async getDetailTuijian() {
				const res = await myRequest({
					method: 'GET',
					url: '/book/mobile/ajax/getRecommendItems?place=14'
				})
				this.tuijian = res.data;
			},
			async getDetailNew() {
				const res = await myRequest({
					method: 'GET',
					url: `/shop-front/mobile/ajax/getNewItems?shopId=${this.shopId}&excludeItemId=${this.itemId}`
				})
				this.newBook = res.data;
			},
			change(e) {
				this.current = e.detail.current;
			},
			onClick(e) {
				console.log(e)
				if(e.index == 0){
					uni.navigateTo({
					    url: `/pages/shop/index?shopId=${this.shop.shopId}`
					});
				}
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
				this.scrollDistance = this.scrollTop;
			},
			backTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			toShop(shopId) {
				console.log(shopId)
				uni.navigateTo({
				    url: `/pages/shop/index?shopId=${shopId}`
				});
			},
			collect(){
				this.isColor=!this.isColor;
			}
		},
		components: {
			uniSwiperDot,
			uniGoodsNav,
			uniIcons,
			uniPopup
		}

	}
</script>

<style lang="scss">
	.top {
		.swiper-box {
			width: 100%;
			height: 750upx;
		}

		.swipe-img {
			width: 100%;
			height: 100%;
		}

		.uni-swiper__warp {
			position: relative;

			.uni-swiper__dots-box {
				width: 70upx !important;
				height: 40upx !important;
				position: absolute !important;
				bottom: 20upx !important;
				left: 625upx !important;
				display: none;
				.uni-swiper__dots-nav-item {
					width: 100%;
					height: 100%;
					margin: 0;
					text-align: center;
					overflow: hidden;
				}
			}

		}
	}

	.jieshao {
		border-bottom: 15px solid #f3f3f3;

		.koubei {
			width: 90%;
			height: 50px;
			background-color: #b41d13;
			color: white;
			margin: 15px auto;
			border-radius: 5px;
			position: relative;

			.koubei-1 {
				font-family: KaiTi;
				font-size: 28px;
				line-height: 50px;
				margin-left: 5px;

			}

			.koubei-2 {
				position: absolute;
				font-size: 24upx;

				top: 50%;
				transform: translateY(-50%);
				left: 20%;
			}

			.koubei-3 {
				position: absolute;
				font-size: 24upx;

				top: 50%;
				transform: translateY(-50%);
				left: 45%;
			}

			.koubei-4 {
				position: absolute;
				font-size: 24upx;

				top: 50%;
				transform: translateY(-50%);
				left: 69%;
			}

			.koubei-5 {
				position: absolute;
				font-size: 24upx;
				top: 50%;
				transform: translateY(-50%);
				right: 3%;
			}
		}

		.content {
			padding-left: 15px;
			padding-right: 15px;

			.content-1 {
				display: flex;
				height: 110px;

				.content-1-left {
					flex: 8;

					.content-tag {
						font-size: 24upx;
						background-color: #b41d13;
						color: white;
						padding: 1px 2px 1px 2px;
						border-radius: 2px;
					}

					.content-name {
						margin-left: 12upx;
						font-size: 36upx;
						font-weight: 300;
						display: -webkit-box;
						/*作为弹性伸缩盒子模型显示*/
						-webkit-line-clamp: 2;
						/*显示的行数；如果要设置2行加...则设置为2*/
						overflow: hidden;
						/*超出的文本隐藏*/
						text-overflow: ellipsis;
						/* 溢出用省略号*/
						-webkit-box-orient: vertical;
						/*伸缩盒子的子元素排列：从上到下*/
					}
				}

				.content-1-right {
					flex: 2;
					position: relative;

					.collect {
						font-size: 32upx;
						line-height: 16px;
						margin-left: 5px;
						font-weight: 200;
						position: absolute;
						top: 5px;
					}
				}
			}

			.content-2 {
				text {
					font-size: 32upx;
					color: #d48c68;
				}
			}

			.content-3 {
				margin-top: 15px;

				.xianjia {
					color: #b41d13;
					font-size: 48upx;
				}

				.zhekou {
					margin-left: 10px;
					color: #d48c68;
					font-size: 24upx;
				}

				.yuanjia {
					margin-left: 10px;
					color: gray;
					font-size: 24upx;
					text-decoration: line-through;
				}

				.leibie {
					font-size: 32upx;
					color: gray;
					margin-left: 160upx;
					padding: 5px 10px 5px 10px;
					background-color: #f3f3f3;
				}
			}

			.content-4 {
				margin-bottom: 15px;
				margin-top: 15px;
				font-size: 40upx;
				color: gray;
			}
		}
	}

	.kuaidi {
		border-bottom: 15px solid #f3f3f3;
		padding-left: 15px;

		.diqu {
			border-bottom: 1px solid lightgray;
			height: 60px;

			.diqu-1 {
				font-size: 32upx;
				line-height: 60px;
				color: gray;
			}

			.diqu-2 {
				font-size: 30upx;
				line-height: 60px;
				margin-left: 10px;
			}

			.diqu-3 {
				font-size: 30upx;
				line-height: 60px;
				margin-left: 20px;
			}
		}

		.huodong {
			border-bottom: 1px solid lightgray;
			height: 50px;

			.huodong-1 {
				line-height: 50px;
				color: gray;
				font-size: 34upx;
			}

			.huodong-2 {
				margin-left: 40upx;
				line-height: 50px;
				font-size: 34upx;
			}

			.huodong-3 {
				margin-left: 210upx;
				line-height: 50px;
				color: gray;
				font-size: 34upx;
			}
		}

		.baozhang {
			height: 60px;

			.baozhang-1 {
				font-family: KaiTi;
				line-height: 60px;
				color: #b41d13;
				font-size: 42upx;
			}

			.baozhang-2 {
				margin-left: 5px;
				line-height: 60px;
				color: lightgray;
				font-size: 38upx;
			}

			.baozhang-3 {
				margin-left: 5px;
				line-height: 60px;
				color: gray;
				font-size: 24rpx;
			}

			.baozhang-4 {
				margin-left: 15px;
				line-height: 60px;
				color: gray;
				font-size: 34upx;
			}
		}
	}

	.chuban {
		border-bottom: 15px solid #f3f3f3;
		padding-left: 15px;

		.chuban-1 {
			height: 40px;
			position: relative;

			.chuban-1-1 {
				line-height: 40px;
				font-size: 28upx;
				color: gray;
			}

			.chuban-1-2 {
				line-height: 40px;
				position: absolute;
				left: 20%;
				font-size: 28upx;
				font-family: SimSun;
			}
		}
	}

	.pinjia {
		border-bottom: 15px solid #f3f3f3;
		padding-left: 15px;
		padding-right: 15px;

		.pinjia-1 {
			height: 50px;
			border-bottom: 2px solid #f3f3f3;
			position: relative;

			.pinjia-1-left {
				line-height: 50px;
				font-size: 32upx;
				position: absolute;
				left: 0;
			}

			.pinjia-1-right {
				line-height: 50px;
				font-size: 32upx;
				color: #b41d13;
				position: absolute;
				right: 0;
			}
		}

		.pinjia-2 {
			margin-top: 5px;
			margin-bottom: 15px;

			.pinlun-2-top {
				color: gray;
				font-size: 28upx;
			}

			.pinlun-2-mid {
				margin-top: 10upx;
				margin-bottom: 10upx;
				height: 130upx;
				position: relative;

				.touxiang {
					height: 90upx;
					width: 90upx;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}

				.pinjia-name {
					font-size: 30upx;
					color: lightgray;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 15%;
				}

				.zan {
					padding: 10upx 20upx 10upx 20upx;
					border-radius: 20upx;
					background-color: pink;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 35%;

					text {
						margin-left: 10upx;
						color: #b41d13;
					}
				}
			}

			.pinlun-2-bottom {
				font-size: 32upx;
			}
		}
	}

	.dianpu {
		margin-top: 15px;
		margin-bottom: 5px;
		padding-left: 15px;
		padding-right: 15px;

		.dianpu-top {
			height: 300upx;

			.dianpu-top-1-left {
				float: left;

				image {
					width: 150upx;
					height: 150upx;
				}
			}

			.dianpu-top-1-right {
				height: 150upx;
				padding-left: 20upx;
				float: left;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.right-1-1 {
					font-size: 34upx;
				}

				.right-1-2 {
					margin-left: 26upx;
					font-size: 26upx;
					background-color: #f3f0e9;
					color: #b19281;
					padding: 8upx 20upx 8upx 20upx;
				}

				.right-2 {}

				.right-3 {
					font-size: 24upx;

					.right-3-1 {
						background-color: #d5efd5;
						color: #80be80;
						padding: 5upx 15upx 5upx 15upx;
						border-radius: 15upx;
					}

					.right-3-2 {
						margin-left: 10upx;
						background-color: #ffaf94;
						color: #f2683b;
						padding: 5upx 15upx 5upx 15upx;
						border-radius: 15upx;
					}

					.right-3-3 {
						margin-left: 45upx;
						border: 1px solid #898989;
						color: #898989;
						padding: 5upx 20upx 5upx 20upx;
						border-radius: 5upx;
					}

					.right-3-4 {
						margin-left: 20upx;
						border: 1px solid #9e100e;
						color: #9e100e;
						padding: 5upx 20upx 5upx 20upx;
						border-radius: 5upx;
					}
				}
			}

			.dianpu-top-2 {
				clear: both;

				.bottom-1 {
					height: 50upx;
					line-height: 50upx;
					font-size: 28upx;
					color: gray;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
				}

				.bottom-2 {
					height: 50upx;
					line-height: 50upx;
					font-size: 28upx;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
				}
			}
		}

		.dianpu-mid {
			height: 100upx;

			text {
				line-height: 100upx;
				color: #b41d13;
				margin-left: 150upx;
			}
		}

		.dianpu-bottom {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.new-book {
				width: 32%;
				display: flex;
				flex-direction: column;

				image {
					width: 100%;
					height: 300upx;
					overflow: hidden;
				}

				.new-name {
					margin-top: 10upx;
					height: 90upx;
					line-height: 44upx;
					font-size: 32upx;
					display: -webkit-box;
					/*作为弹性伸缩盒子模型显示*/
					-webkit-line-clamp: 2;
					/*显示的行数；如果要设置2行加...则设置为2*/
					overflow: hidden;
					/*超出的文本隐藏*/
					text-overflow: ellipsis;
					/* 溢出用省略号*/
					-webkit-box-orient: vertical;
					/*伸缩盒子的子元素排列：从上到下*/
				}

				.new-price {
					margin-bottom: 40upx;
					border-bottom: 20upx solid #f3f3f3;
					height: 60upx;
					line-height: 60upx;
					color: #b41d13;
					font-size: 34upx;
					font-weight: 700;
				}
			}
		}
	}

	.goods-detail {
		.detail-top {
			height: 150upx;
			background-color: #f3f3f3;
			position: relative;

			.detail-line1 {
				position: absolute;
				top: 50%;
				left: 30%;
				transform: translateY(-50%);
				height: 1px;
				width: 60upx;
				background-color: gray;
			}

			.detail-text {
				color: gray;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.detail-line2 {
				position: absolute;
				top: 50%;
				left: 62%;
				transform: translateY(-50%);
				height: 1px;
				width: 60upx;
				background-color: gray;
			}
		}

		.detail-post {
			image {
				width: 100%;
				height: 250upx;
			}
		}

		.detail-content {
			padding-left: 15px;
			padding-right: 15px;

			.miaoshu {
				height: 150upx;
				line-height: 150upx;
				border-bottom: 1px solid gray;
				font-weight: 700;
			}

			.neirong {
				.neirong-1 {
					height: 80upx;
					line-height: 80upx;
					font-weight: 700;
				}

				.neirong-2 {
					font-size: 30upx;
					color: gray;
					line-height: 55upx;
				}
			}
		}
	}

	.goods-img {
		image {
			margin-top: 25upx;
			width: 100%;
			height: 800upx;
		}
	}

	.goods-same {
		margin-top: 20upx;
		border-bottom: 20upx solid #f3f3f3;

		.same-top {
			height: 100upx;
			position: relative;

			.same-line1 {
				position: absolute;
				top: 50%;
				left: 30%;
				transform: translateY(-50%);
				height: 1px;
				width: 60upx;
				background-color: gray;
			}

			.same-text {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.same-line2 {
				position: absolute;
				top: 50%;
				left: 62%;
				transform: translateY(-50%);
				height: 1px;
				width: 60upx;
				background-color: gray;
			}
		}

		.same-content {
			background-color: #f3f3f3;
			padding-left: 20upx;
			padding-right: 20upx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.same-single {
				background-color: white;
				width: 48.5%;
				flex-direction: column;
				border-bottom: 20upx solid #f3f3f3;

				.single-img {
					width: 100%;
					height: 350upx;
					border-top-left-radius: 10upx;
					border-top-right-radius: 10upx;
				}

				.single-jieshao {
					margin-left: 10upx;
					margin-right: 10upx;
					font-size: 30upx;
					display: -webkit-box;
					/*作为弹性伸缩盒子模型显示*/
					-webkit-line-clamp: 2;
					/*显示的行数；如果要设置2行加...则设置为2*/
					overflow: hidden;
					/*超出的文本隐藏*/
					text-overflow: ellipsis;
					/* 溢出用省略号*/
					-webkit-box-orient: vertical;
					/*伸缩盒子的子元素排列：从上到下*/
				}

				.single-type {
					margin-top: 10upx;
					margin-bottom: 10upx;
					margin-left: 15upx;
					margin-right: 15upx;
					display: flex;
					flex: row;
					justify-content: space-between;

					.single-t {
						color: #d48c68;
						background-color: #f3f3f3;
						font-size: 32upx;
						padding: 5upx 10upx 5upx 10upx;
						border-radius: 5upx;
					}

					.single-add {
						font-size: 32upx;
						color: gray;
					}
				}

				.single-price {
					display: block;
					height: 70upx;
					line-height: 50upx;
					font-size: 36upx;
					color: #b41d13;
					font-weight: 700;
				}
			}
		}
	}

	.goods-tuijian {
		border-bottom: 20upx solid #f3f3f3;
		margin-top: 20upx;

		.tuijian-top {
			height: 100upx;
			position: relative;

			.tuijian-line1 {
				position: absolute;
				top: 50%;
				left: 30%;
				transform: translateY(-50%);
				height: 1px;
				width: 60upx;
				background-color: gray;
			}

			.tuijian-text {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.tuijian-line2 {
				position: absolute;
				top: 50%;
				left: 62%;
				transform: translateY(-50%);
				height: 1px;
				width: 60upx;
				background-color: gray;
			}
		}

		.tuijian-content {
			background-color: #f3f3f3;
			padding-left: 20upx;
			padding-right: 20upx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.same-single {
				background-color: white;
				width: 48.5%;
				flex-direction: column;
				border-bottom: 20upx solid #f3f3f3;

				.single-img {
					width: 100%;
					height: 350upx;
					border-top-left-radius: 10upx;
					border-top-right-radius: 10upx;
				}

				.single-jieshao {
					margin-left: 10upx;
					margin-right: 10upx;
					font-size: 30upx;
					display: -webkit-box;
					/*作为弹性伸缩盒子模型显示*/
					-webkit-line-clamp: 2;
					/*显示的行数；如果要设置2行加...则设置为2*/
					overflow: hidden;
					/*超出的文本隐藏*/
					text-overflow: ellipsis;
					/* 溢出用省略号*/
					-webkit-box-orient: vertical;
					/*伸缩盒子的子元素排列：从上到下*/
				}

				.single-type {
					height: 60upx;
					margin-top: 20upx;
					margin-bottom: 20upx;
					margin-left: 15upx;
					margin-right: 15upx;
					display: flex;
					flex: row;
					justify-content: space-between;

					.single-t {
						color: #d48c68;
						background-color: #f3f3f3;
						font-size: 32upx;
						padding: 5upx 10upx 5upx 10upx;
						border-radius: 5upx;
					}

					.single-add {
						font-size: 32upx;
						color: gray;
					}
				}

				.single-price {
					display: block;
					height: 80upx;
					line-height: 80upx;
					font-size: 36upx;
					color: #b41d13;
					font-weight: 700;
				}
			}
		}
	}

	.no-more {
		height: 130upx;
		position: relative;

		.tuijian-line1 {
			position: absolute;
			top: 50%;
			left: 28%;
			transform: translateY(-50%);
			height: 1px;
			width: 60upx;
			background-color: gray;
		}

		.tuijian-text {
			color: gray;
			font-size: 32upx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.tuijian-line2 {
			position: absolute;
			top: 50%;
			left: 64%;
			transform: translateY(-50%);
			height: 1px;
			width: 60upx;
			background-color: gray;
		}
	}

	.back-top {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		color: gray;
		border: 1px solid gray;
		background-color: white;
		position: fixed;
		bottom: 160upx;
		right: 42upx;

		.uni-icons {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 0%;
		}

		.bk-txt {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 45%;
			font-size: 30upx;
		}
	}

	.popup-1 {
		.popup-1-all {
			width: 100%;
			height: 1050upx;
			border-top-left-radius: 30upx;
			border-top-right-radius: 30upx;
			background-color: white;

			.pop-top {
				height: 12%;
				background-color: #f3f3f3;
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;
				position: relative;

				.pop-biaoti {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-weight: 700;
				}

				.uni-icons {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 5%;
				}
			}

			.pop-content {
				margin-top: 30upx;
				padding-left: 70upx;
				padding-right: 70upx;

				.pop-jieshao {
					.pop-jieshao-1 {
						height: 90upx;

						.pop-jieshao-1-1 {
							font-size: 32upx;
							line-height: 90upx;
							margin-left: 30upx;
						}
					}

					.pop-jieshao-2 {
						font-size: 30upx;
						line-height: 48upx;
					}
				}

				.iknow {
					margin-top: 50upx;
					width: 100%;
					height: 90upx;
					background-color: #b41d13;
					color: white;
					text-align: center;
					line-height: 90upx;
				}
			}
		}
	}

	.foot {
		.uni-tab__cart-button-right {
			margin-top: 10upx;
			margin-bottom: 10upx;
		}

		.uni-goods-nav {
			width: 100%;
			border-top: 2px solid #f3f3f3;
			position: fixed;
			bottom: 0;
		}

		.uni-tab__cart-box {
			height: 60px !important;
		}

		.uni-tab__cart-button-right-text {
			font-size: 32rpx !important;
		}
	}
</style>
