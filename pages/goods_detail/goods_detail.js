import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:'',
    detail:{
      pics:[]
    },
    indicatorDots: true,
    indicatorColor: 'rgba(225,225,225,.3)',
    indicatorActiveColor: "#fff",
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
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
      this.setData({
        detail:message
      })
    })
  },

})