/**
 * Created by lenovo on 2017/10/29.
 */

//表单校验功能
$(function () {
  ////表单校验功能
  //1. 用户名不能为空
  //2. 用户密码不能为空
  //3. 用户密码必须是6-12位
  
  var $form = $('#form');
  $form.bootstrapValidator({
    //校验是的字体图标
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "用户密码不能为空"
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          callback: {
            message: "用户密码错误"
          }
        }
      }
    }
  });
  //表单校验初始化,就会有个校验实例
  var validator = $form.data("bootstrapValidator");
  
  //2.给表单注册一个成功校验事件
  $form.on("success.form.bv",function (e) {
    e.preventDefault();
    // console.log("hhh");
    
    //发送ajax,意味着需要获取username  password
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function (data) {
        console.log(data);//验证是否可以得到这个值
        if(data.success){
          location.href = "index.html";
        }else{
          if(data.error === 1000){
            validator.updateStatus("username","INVALID","callback");
          }
          if(data.error === 1001){
            validator.updateStatus("password","INVALID","callback")
          }
        }
      }
    })
  });
  
  
  //3.重置表单校验
  $("[type='reset']").on("click",function () {
    validator.resetForm();
    
  });
  
  
  
})