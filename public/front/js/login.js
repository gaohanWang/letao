/**
 * Created by lenovo on 2017/11/4.
 */
$(function () {
    
  //给登录添加点击事件
  $(".btn_login").on("click",function () {
  
    // console.log("111");
    //获取用户 和密码的 value值
    var username = $("[name = 'username']").val();
    var password = $("[name = 'password']").val();//获取里面的值,传入后台
  
    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    if(!password){
      mui.toast("请输入密码");
      return false;
    }
    
    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password
      },
      success:function (data) {
        // console.log(data);
      //如果登录成功  跳到原来来的网页
        //如果失败,跳到个人中心  user.html
        var search = location.search;
        if(search.indexOf("retUrl") > -1){
          search = search.replace("?retUrl","")
          location.href = search;
        }else {
          location.href = "user.html";
        }
        
        if (data.error === 403){
          mui.toast(data.message);
        }
        
      }
    })
    
    
  })

  

  
  
  
  
  
  
  
  
  
  
  
})