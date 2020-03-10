import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    categories:[
      {
        children:[]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    request({
      url:"/categories"
    }).then(res=>{
      // console.log(res)
      const { message }=res.data
      this.setData({
        categories:message
      })
    })
  },
  // 点击左侧列表选项切换分类显示
  handleClick(e){
    // console.log(e)
    this.setData({
      current:e.currentTarget.dataset.index
    })
    
  }
})