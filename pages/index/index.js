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
    menus:[],
    floorData:[],
    isShowBtn:false
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
      const newData=message.map((v,i)=>{
        if(i===0){
          v.url="/pages/category/category"
        }
        return v;
      })
      this.setData({
        menus: newData,
      })
    })
    // 楼层
    request({
      url:"/home/floordata"
    }).then(res=>{
      // console.log(res)
      const { message } = res.data
      this.setData({
        floorData: message,
      })
    })
  },
  onPageScroll(e){
    // console.log(e)
    const {scrollTop} = e;
    let isShow = this.data.isShowBtn;

    if (scrollTop>100) {
      isShow = true
    } else {
      isShow = false
    }

    if (isShow == this.data.isShowBtn) return;

    this.setData({
      isShowBtn: isShow
    })
  },
  handleTotop(){
    wx:wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000,
    })
  }
})
