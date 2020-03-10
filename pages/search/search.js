import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue:'',
    // 上次输入的值
    lastValue:'',
    // 搜索建议
    searchList:[],
    // 请求状态，false为不在请求或请求完毕，true为正在请求中
    loading:false,
    // 本地存储的历史记录
    history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储
    let arr=wx.getStorageSync('history');
    // isArray()判断一个对象是否为数组
    // 如果本地没有数据或者arr不是一个数组,将arr设为空数组
    if(!Array.isArray(arr)){
      arr=[]
    }
    this.setData({
      history:arr
    })
  },
  // 监听输入框，键盘输入时触发
  handleInput(e){
    const {value} = e.detail;
    this.setData({
      inputValue:value
    })

    if(!value) {
      this.setData({
        searchList:[]
      })

      return;
    };
    this.searchData();
  },
  handleShowList(e){
    console.log(e)
    // e.target为当前点击元素
    const {onlyid}=e.target.dataset;
    // 如果goods_id不存在，说明点击的不是下拉列表
    if(!onlyid){
      this.setData({
        searchList: []
      })
    }   
  },
  handleClear(){
    this.setData({
      history:[]
    })

    wx.setStorageSync('history', [])
  },
  handleEnter(){
    let arr=wx.getStorageSync('history');
    if (!Array.isArray(arr)) {
      arr = []
    }
    arr.unshift(this.data.inputValue)
    // 数组去重，保留前面的值
    arr=[...new Set(arr)]

    wx.setStorageSync('history', arr)

    wx.redirectTo({
      url: '/pages/goods_list/goods_list?keyword='+this.data.inputValue,
    })
  },
  // 取消搜索
  handleCancel(){
    this.setData({
      inputValue:'',
      searchList:[]
    })
  },
  // 商品搜索请求
  searchData(){
    // 上次请求完毕才能进入
    if(this.data.loading==false){
      this.setData({
        // 进入后修改状态
        loading:true,
        // 记录当前输入框的值
        lastValue:this.data.inputValue
      })

      request({
        url: "/goods/qsearch",
        data: {
          query: this.data.inputValue
        }
      }).then(res => {
        // console.log(res)
        const { message } = res.data
        this.setData({
          searchList: message,
          // 请求到数据后修改状态
          loading:false
        })

        // 判断发送请求的输入值与当前输入值是否一致，若不一致则再次请求
        if(this.data.inputValue!==this.data.lastValue){
          this.searchData()
        }
      })
    }
    
  }
})