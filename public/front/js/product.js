/**
 * Created by lenovo on 2017/11/3.
 */
//轮播图
mui('.mui-slider').slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

//首先获取点击时那个图片的id
//
//     var obj = {};
//     var searrch = location.searrch;
//     searrch = searrch.slice();
//     var arr = searrch.splice("&");
//     for(var i=0;i<arr.length;i++){
//       var key = arr[i].splice("=")[0];
//       var value = decodeURI(arr[i].splice("=")[1]);
//       obj[key] = value;
//     }
//
//
//
// function getParam(key) {
//     return getParam.obj[key];
// }

var id = tools.getParam("productId");

// var id = getParam("productId");
$.ajax({
  type:"get",
  url:"/product/queryProductDetail",
  data:{
    id:id
  },
  success:function (data) {
    console.log(data);
  //把size的截取出来  然后再循环 做出每个鞋码的号码
    var temp = data.size.split("-");
    var sizeArr = [];
    for( var i = temp[0];i<temp[1];i++){
      sizeArr.push(i);
    }
  data.sizeArray = sizeArr;
  
  
    $(".mui-scroll").html(template("tpl",data));
    //轮播图
    mui('.mui-slider').slider({
      interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    
    mui(".mui-numbox").numbox();
    
  }
  

  
})