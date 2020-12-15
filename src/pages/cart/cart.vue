<template>
	<view>
		<view class="list-item">
			<view v-for="(item,index) in goodList" :key='index'>
				<view class="group">
					<view class="check">
						<checkbox-group @change="changeitem(item)" checked class="checkbox">
							<checkbox :value="item.unitPrice" :checked="item.checked" />
							<text class="iconfont icon-shangdian-"></text>
							<text class="shop">{{item.shopname}}</text>
						</checkbox-group>
					</view>
					<van-card num="1" :desc="item.level" :title="item.name" :thumb="item.src" :price="item.unitPrice" />
				</view>
			</view>
			<van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onClickButton">
				<view class="checkbox">
					<checkbox-group @change="selectAll">
						<checkbox :checked="allChecked">全选</checkbox>
					</checkbox-group>
				</view>
			</van-submit-bar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodList: [{
						id: 0,
						src: require('../../static/hmlogo.png'),
						unitPrice: '23',
						name: '读者',
						shopname:'紫檀',
						home: '河北',
						level: '正品',
						speci: '500g/件',
						subtotal: '230',
						numberBox: 1,
						checked: false
					},
					{
						id: 1,
						src: require('../../static/hmlogo.png'),
						unitPrice: '50',
						name: '意林',
						shopname:'绿苑',
						home: '甘肃',
						level: '正品',
						speci: '500g/件',
						subtotal: '501',
						numberBox: 1,
						checked: false
					}
				],
				checkList: [], //选中值
				allChecked: false, //是否全选
			}
		},
		//计算总价
		computed: {
			totalPrice() {
				let totalPrice = 0
				this.goodList.map(item => {
					item.checked ? totalPrice += item.numberBox * item.unitPrice : totalPrice += 0
				})
				return totalPrice
			}
		},
		methods: {
			//单选
			changeitem(item) {
				item.checked = !item.checked
				if (!item.checked) {
					this.allChecked = false
				} else {
					// 判断每一个商品是否是被选择的状态
					const cartList = this.goodList.every(item => {
						return item.checked === true
					})
					if (cartList) {
						this.allChecked = true
					} else {
						this.allChecked = false
					}
				}
			},
			//全选，全不选
			selectAll() {
				this.allChecked = !this.allChecked
				if (this.allChecked) {
					this.goodList.map(item => {
						item.checked = true
					})
				} else {
					this.goodList.map(item => {
						item.checked = false
					})
				}
			},
			onClickButton(){
				console.log("11")
				 uni.navigateTo({
				      url: '../transaction/index.vue',
				     success: res => {},fail: () => {},complete: () => {}
				 })
				 console.log("121")
			}
		},
		
	}
</script>
<style lang="scss" scoped>
	.van-swipe-cell__left,
	.van-swipe-cell__right {
		display: inline-block;
		width: 65px;
		height: 44px;
		font-size: 15px;
		line-height: 44px;
		color: #fff;
		text-align: center;
		background-color: #f44;
	}
	
	.group {
			
		.shop{
			padding-left: 15upx;
			font-size: 14px;;
		}
		position: relative;
		width: 100%;
		.van-card_header {
			position: relative;
			margin-left: 20upx;
		}
	}

	.van-submit-bar__bar {}
</style>
