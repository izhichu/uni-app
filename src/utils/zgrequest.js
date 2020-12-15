// 封装get请求
const baseUrl = "https://m.kongfz.com"

export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			method: options.method,
			data: options.data,
			url: baseUrl+options.url,
			header: { 'Content-Type': 'application/x-www-form-urlencoded'},
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				uni.showToast({
					title: '获取数据失败'
				})
				reject(err)
			}
		})
	})
}