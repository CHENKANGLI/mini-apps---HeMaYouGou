import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     keyword:0,
     pagenum:1,
     goods:[],
     hasMore:true,
     loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    // console.log(options)
    const { keyword } = options
     this.setData({
       keyword:keyword
     })
    this.getGoods()
  },
  // 获取商品列表
  getGoods(){
    if(this.data.hasMore==false) return;
    request({
      url: "/goods/search",
      data: {
        query: this.data.keyword,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      //  console.log(res)
      const { message } = res.data
      const goods = message.goods.map((v, i) => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        goods: [...this.data.goods, ...goods],
        loading:false
      })
      if(this.data.goods.length>=message.total){
        this.setData({
          hasMore:false
        })
      }
    })
  },
  // 上拉刷新
  onReachBottom() {
    if(this.data.loading==false){
      this.setData({
        loading:true,
        pagenum: this.data.pagenum + 1
      })
      this.getGoods()
    }
  }

})