import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:'',
    detail:{
      pics:[],
      attrs:[]
    },
    indicatorDots: true,
    indicatorColor: 'rgba(225,225,225,.3)',
    indicatorActiveColor: "#fff",
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    current:0,
    preViewUrls:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const {goods_id}=options
    this.setData({
      goods_id:goods_id
    })
    request({
      url:"/goods/detail",
      data:{
        goods_id:this.data.goods_id
      }
    }).then(res=>{
      console.log(res)
      const {message} = res.data
      const preViewUrls =message.pics.map((v,i)=>{
       return v.pics_big_url
      })
      this.setData({
        detail:message,
        preViewUrls
      })
    })
  },
  handleTab(e){
    // console.log(e)
    const { index } = e.currentTarget.dataset
    this.setData({
      current: index
    })
  },
  handlePreview(e){
    const { idx } = e.currentTarget.dataset
    wx.previewImage({
      current: this.data.preViewUrls[idx], // 当前显示图片的http链接
      urls: this.data.preViewUrls // 需要预览的图片http链接列表
    })
  },
  jumpToCart(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  }
})