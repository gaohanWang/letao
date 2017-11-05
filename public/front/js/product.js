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
// 获取productId
//发送ajax请求
// 渲染网页
// 注意:里面都是添加了要重新渲染
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
  

  
});

//给span添加点击事件
$(".mui-scroll").on("click",".size",function () {
  $(this).addClass("now").siblings().removeClass("now");
});

//点击购物车添加到购物车
$(".btn_add_cart").on("click",function () {
  //获取size 的值
  var size = $(".size.now").html();//拿到size的值
  console.log(size);//就是点击的那个值
  var num = $(".mui-numbox-input").val();//拿到input框里的值
  
  //判断是否有选择尺码
  if(!size){
    mui.toast("请输入尺码");
    return false;
  }
  //发送ajax请求
  $.ajax({
    type:"post",
    url:"/cart/addCart",
    data:{
      productId:id,
      num:num,
      size:size
    },
    success:function (data) {
      console.log(data);
      if(data.success){
        mui.toast("添加成功");
      }
      if(data.error === 400){
        location.href = "login.html?retUrl"+location.href;
      }
    }
  })
})














