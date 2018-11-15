Page({
  data: {
    current: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
    audioAction: {
      method: 'pause'
    },
    song_id: "",
    y: 0,
    lyricArr:[],
    lyricObj:null,
    time:0
  },
  audioPlayed: function (e) {
    console.log('audio is played')
  },
  audioTimeUpdated: function (e) {
    console.log(e.detail.duration);
    this.duration = e.detail.duration;
  },

  timeSliderChanged: function (e) {
    if (!this.duration)
      return;

    var time = this.duration * e.detail.value / 100;
    console.log(time)
    this.setData({
      audioAction: {
        method: 'setCurrentTime',
        data: time
      }
    });
  },
  playbackRateSliderChanged: function (e) {
    this.setData({
      audioAction: {
        method: 'setPlaybackRate',
        data: e.detail.value
      }
    })
  },

  playAudio: function () {
    this.setData({
      audioAction: {
        method: 'play'
      }
    });
    var scrollLyc = setInterval(()=>{
      this.setData({
        time: ++this.data.time
      })
      if (this.data.lyricObj[this.data.time]){
        console.log(this.data.lyricObj[this.data.time]);
        var y = this.data.y - 10
        this.setData({
          y
        })
      }
    },1000)
  },
  pauseAudio: function () {
    this.setData({
      audioAction: {
        method: 'pause'
      }
    });
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
      var current = {
        poster: pic,
        name: title,
        author: author,
        src: mp3,
      }
      console.log(current)
      return new Promise((resolve, reject) => {
        that.setData({
          current
        })
      })
    }

    getMusic().then(playMusic)
  },
  getLrc() {
    var that = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', //仅为示例，并非真实的接口地址
      data: {
        method: "baidu.ting.song.lry",
        songid: that.data.song_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.lrcContent)
        var lrc = res.data.lrcContent;
        if (lrc) {
          that.handelLrc(lrc);
        } else {
          that.handelLrc("");
        }

      }
    })
  },
  onLoad(options) {
    this.setData({
      song_id: options.song_id
    })
    // 获取音乐
    this.getMp3();
    // 获取歌词
    this.getLrc();
  },
  handelLrc(lyric) {
    let timearr = lyric.split('[')
    let obj = {}
    let lyricArr = []
    // seek 为键  歌词为value
    timearr.forEach((item) => {
      let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
      let val = item.split(']')[1];
      obj[key] = val;

    })
    for (let key in obj) {
      // obj[key] = obj[key].split('\n')[0]
      lyricArr.push(obj[key])
    }
    console.log(lyricArr)
    this.setData({
      lyricArr,
      lyricObj:obj
    })

  }
})