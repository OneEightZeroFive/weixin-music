// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.song_id);
    this.setData({
      song_id: options.song_id
    })
    this.getMp3();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMp3() {
    var that = this;
    function getMusic() {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', //仅为示例，并非真实的接口地址
          data: {
            method: "baidu.ting.song.play",
            songid: that.data.song_id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            resolve(res)
          }
        })
      })
    }
    function playMusic(res) {
      var mp3 = res.data.bitrate.file_link;
      var title = res.data.songinfo.title;
      var pic = res.data.songinfo.pic_small;
      var author = res.data.songinfo.author;

      console.log(mp3, title, pic)
      return new Promise(function (resolve, reject) {
        const backgroundAudioManager = wx.getBackgroundAudioManager();
        backgroundAudioManager.title = title;
        backgroundAudioManager.epname = title;
        backgroundAudioManager.singer = author;
        backgroundAudioManager.coverImgUrl = pic;
        // 设置了 src 之后会自动播放
        backgroundAudioManager.src = mp3;
      })
    }

    getMusic().then(playMusic)


  }
})