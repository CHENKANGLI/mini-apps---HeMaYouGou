import request from "../../utils/request.js"
Page({
  data:{
    // 轮播图数据
    swiperImg: [],
    indicatorDots: true,
    indicatorColor: 'rgba(225,225,225,.3)',
    indicatorActiveColor: "#fff",
    autoplay: true,
    interval: 2000,
    duration:500,
    circular:true,
    // 导航菜单数据
    menus:[]
  },
  onLoad(){
    // 加载轮播图数据
    request({
      url:'/home/swiperdata'
    }).then(res=>{
      // console.log(res)
      const {message} = res.data
      this.setData({
        swiperImg:message,
      })
    })
    // 导航菜单
    request({
      url:'/home/catitems'
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        menus: message,
      })
    })
  }
})
