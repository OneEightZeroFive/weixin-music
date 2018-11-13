module.exports = {
  // 仓库
  store: {
    title: "名字",
    age: 18,
    name: ""
  },
  // 队列
  list: {
  },
  on: function (key, fn) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn)
  },
  emit: function (key, params) {
    let fns = this.list[key];
    for (let p in params) {
      this.store[p] = params[p]
    }
    fns.forEach(fn => {
      fn(params)
    })
  }
};