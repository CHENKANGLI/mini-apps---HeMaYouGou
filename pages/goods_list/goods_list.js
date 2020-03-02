import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     keyword:'曲面电视',
     pagenum:1,
     goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    console.log(options)
    // const { keyword } = options
    //  this.setData({
    //    keyword:keyword
    //  })

     request({
       url:"/goods/search",
       data:{
         query:this.data.keyword,
         pagenum:this.data.pagenum,
         pagesize:10
       }
     }).then(res=>{
      //  console.log(res)
      const {message}=res.data
      const goods=message.goods.map((v,i)=>{
        v.goods_price=Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        goods:[...this.data.goods,...goods]
      })
     })
  },

})