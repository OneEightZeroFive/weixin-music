//index.js
//获取应用实例
const app = getApp()
import store from "../../utils/store.js";
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad() {

  },
  onReachBottom() {
    console.log("碰底部")
    store.emit("onReachBottom",{
      name:"llll"
    })
  }
})
