import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue:'曲面电视',
    searchList:[],
    // 请求转态
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchData();
  },
  // 商品搜索
  searchData(){
    request({
      url:"/goods/qsearch",
      data: {
        query: this.data.inputValue
      }
    }).then(res=>{
      console.log(res)
      const {message}=res.data
      this.setData({
        searchList:message
      })
    })
  }
})