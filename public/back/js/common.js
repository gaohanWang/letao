/**
 * Created by lenovo on 2017/10/29.
 */

//做一个判断如果没有登录就跳到登录页面

//希望在ajax调用之前start
//在ajax调用结束后执行done

//校验用户是否登录的功能
//路径中，并没有login.html
  if(location.href.indexOf("login.html") < 0 ){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (data) {
        // console.log(data);
        if(data.error == 400){
          location.href="login.html";
        }
      }
    })
  }


$(document).ajaxStart(function () {
  //让进度条显示出来
  NProgress.start();
})


$(document).ajaxStop(function () {
  setTimeout(function () {
    //让进度条结束
    NProgress.done();
  }, 500);
});


//模态框
$(function () {
  var logout = $('.icon_logout');
  //点击弹出模态框
 logout.on("click",function () {
   $('#logoutModal').modal("show");
 });
  //点击确定退到登录页面
  $(".btn_logout").on("click",function () {
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function (data) {
        // console.log(data);
        if(data.success){
          location.href = "login.html";
        }
      }
    })
  })
  
  
  //点击分类管理，显示或者隐藏二级分类
  $(".child").prev().on("click", function () {
    $(this).next().slideToggle();
  })
  
  //让侧边栏隐藏
  $(".icon_menu").on("click",function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
  })
 
})