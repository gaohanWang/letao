/**
 * Created by lenovo on 2017/11/5.
 */

//发送验证码到后台,后台通过第三方短信端发送到手机

//1.点击发送按钮是按钮变色,并把字改为发送中...
//2.禁用这个按钮不能点击
$(function () {
  $(".btn_getcode").on("click",function () {
    // console.log(11);
    var $this = $(this);
    if($this.hasClass("disabled")){
      return;
    }
    $this.addClass("disabled").html("发送中...");
    $.ajax({
      type:"get",
      url:"/user/vCode",
      success:function (data) {
        console.log(data.vCode);
        var num = 5;
        var timer = setInterval(function () {
          num--;
          $this.html( num + "秒后再次发送");
          if(num <= 0){
            $this.html("再次发送").removeClass("disabled");
            clearInterval(timer);
          }
        },1000)
      }
    })
  });
  
  //验证更判断用户名,请输入密码,验证手机号,验证验证码
  // 点击注册按钮  获取  表单里面的值一一验证
  $(".btn_register").on("click",function () {
    var username = $("[name = 'username']").val();
    var password = $("[name = 'password']").val();
    var repassword = $("[name = 'repassword']").val();
    var mobile  = $("[name = 'mobile']").val();
    var vCode  = $("[name = 'vCode']").val();
    
    if(!username){
      mui.toast("请输入用户名");
      return false ;
    }
    if(!password){
      mui.toast("请输入用密码");
      return false ;
    }
    if(!repassword){
      mui.toast("请输入用确认密码");
      return false ;
    }
    if(!mobile){
      mui.toast("请输入电话号码");
      return false ;
    }
    if(!vCode){
      mui.toast("请输入验证码");
      return false ;
    }
    //验证验证码
    if(!/^\d{6}$/.test(vCode)){
      mui.toast("请输入6位数验证码");
      return false ;
    }
    //判断密码是否和上次一样
    if(!password == repassword){
      mui.toast("您输入的密码和上一次不一致");
      return false ;
    }
    //判断有效的手机号
    if(!/^1[3578]\d{9}$/.test(mobile)){
      mui.toast("您输入有效的手机号");
      return false ;
    }
    
    // 发送ajax请求
    $.ajax({
      type:"post",
      url:"/user/register",
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success:function (data) {
        if(data.success){
          location.href = "login.html";
          setTimeout(function () {
            mui.toast("注册成功")
          },1000)
        }else {
          mui.toast(data.message);
        }
        
        
      }
    })
    
  })
  
  
  
  
})