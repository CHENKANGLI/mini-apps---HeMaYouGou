import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:'',
    detail:{}
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
        query:this.data.goods_id
      }
    }).then(res=>{
      console.log(res)
    })
  },

})