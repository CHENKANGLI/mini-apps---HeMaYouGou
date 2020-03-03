import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue:'',
    // 请求转态
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 商品搜索
  searchData(){
    request({
      url:"/goods/qsearch",
      query:this.data.inputValue
    }).then(res=>{
      console.log(res)
    })
  }
})