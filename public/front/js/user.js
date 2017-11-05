/**
 * Created by lenovo on 2017/11/5.
 */
//点击个人中心 看自己有没有登录没有就返回登录页面

$(function () {
  
  //发送ajax请求 请求用户信息
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function (data) {
      // console.log(data);
      $(".lt_user").html(template("tpl",data));
    }
  })
  
  
  
  
  //给退出绑定事件点击是否退出
  $(".logout").on("click",function () {
    // console.log(11);

        // console.log(data);
        //弹出模态框点击是否确定
        mui.confirm("你确定退出吗?","提示",['否','是'],function (e) {
          if(e.index === 0){
            mui.toast("操作取消");
          }else {
            $.ajax({
              type:"get",
              url:"/user/logout",
              success:function (data) {
                // console.log(data);
                tools.checkLogin(data);
                if(data.success){
                  location.href = "login.html";
                }
              }
        });
        mui.toast("退出成功")
      }
    })
    
  })
  


  
  
})