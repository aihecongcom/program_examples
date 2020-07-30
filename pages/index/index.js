//index.js
//获取应用实例
const app = getApp()
let kefupara = {};
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    btnText:'请先点上方按钮获取头像昵称',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    condition : false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true

      })
      //小程序获取到微信信息后去设置顾客资料
      setUser(this,app.globalData.userInfo)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //小程序获取到微信信息后去设置顾客资料
       setUser(this,res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // 在没有 open-type=getUserInfo 版本的兼容处理
          setUser(this,res.userInfo)
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //小程序获取到微信信息后去设置顾客资料
    setUser(this,e.detail.userInfo)
  }
}

)
/**
 * 获取并设置用户信息
 * @param {*} thisData 
 * @param {*} userinfo 
 */
function setUser(thisData,userinfo){
console.log(userinfo)
//该参数可设置指定客服接待对话(客服ID在 设置-->成员管理-->点击成员-->客服ID)
kefupara.assignService = "客服ID"
//用户昵称
if(userinfo.nickName)kefupara.nickName = userinfo.nickName
//用户头像
if(userinfo.avatarUrl)kefupara.avatarUrl = userinfo.avatarUrl
//性别
if(userinfo.gender)kefupara.gender = userinfo.gender
//城市
if(userinfo.city)kefupara.city = userinfo.city
//省份
if(userinfo.province)kefupara.province = userinfo.province
//国家
if(userinfo.country)kefupara.country = userinfo.country
//语言
if(userinfo.language)kefupara.language = userinfo.language

//可以自定义参数
kefupara['会员等级'] = "vip1"
kefupara.vip = "vip2"
//...可以填加更多的自定义字段信息
//因为传参需要字符串类型，json转换成string
kefupara = JSON.stringify(kefupara);
console.log(kefupara);
//对外赋值，button调用（wxmlw文件中调用）
thisData.setData({
  kefupara: kefupara,
  btnText:"联系客服",
  condition: true
})
}