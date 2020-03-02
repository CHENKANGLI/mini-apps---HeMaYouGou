// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    console.log(options)
    const { keyword } = options
     this.setData({
       keyword:keyword
     })
  },

})