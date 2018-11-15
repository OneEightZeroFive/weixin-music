// components/pannel/pannel.js
import store from '../../utils/store.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    channel: {
      type: String,//String, Number, Boolean, Object, Array, null
      value: "hot",
      observer: function (newVal, oldVal, changedPath) {
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    song_list: [],
    offset: 0,
    types: {
      news: 1,
      hot: 2,
      rock: 11
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载歌单信息
    loadMore() {
      var that = this;
      // 翻页
      that.setData({
        offset: ++that.data.offset
      })
      wx.request({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', //仅为示例，并非真实的接口地址
        data: {
          method: "baidu.ting.billboard.billList",
          type: that.data.types[that.properties.channel],
          size: 10,
          offset: that.data.offset
        },

        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data.song_list)
          that.setData({
            song_list: that.data.song_list.concat(res.data.song_list)
          })
        }
      })
    }
  },
  attached: function () {
    console.log(this.properties.channel)
  },
  ready: function () {
    console.log(store);
    this.loadMore();
    store.on("onReachBottom", (data) => {
      console.log("我监听到index页面的触底操作了");
      this.loadMore();
    })
  }
})