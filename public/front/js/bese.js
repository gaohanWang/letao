/**
 * Created by lenovo on 2017/11/1.
 */
// scroll滑动  区域滑动
mui(".mui-scroll-wrapper").scroll({
  indicators : false,
})


//tools中放了常用的一些方法
var tools = {
  //获取地址栏中所有的参数
  getParamObj: function () {
    var obj = {};
    var search = location.search;
    search = search.slice(1);
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split("=")[0];
      var value = decodeURI(arr[i].split("=")[1]);
      obj[key] = value;
    }
    //this指向的是谁：  4种调用模式
    return obj;
  },
  getParam:function (key) {
    return this.getParamObj()[key];
  },
  checkLogin:function (data) {
    if(data.error == 400){
      location.href = "login.html?retUrl="+location.href;
    }
  }
}