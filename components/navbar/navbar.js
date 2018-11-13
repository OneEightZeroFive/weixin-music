// components/navbar/navbar.js
import store from '../../utils/store.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick: function (e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    }
  },
  ready(){
    store.on("onReachBottom", (data) => {
      console.log("我监听到index页面的触底操作了");
    })
  }
})
