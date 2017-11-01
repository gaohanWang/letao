/**
 * Created by lenovo on 2017/10/30.
 */

$(function () {
  //用ajax调用数据库
  var currentPage = 1;
  var pageSize = 8;
  
  function render() {
     $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
        page:currentPage,
        pageSize:pageSize
      },
    success:function (data) {
      // console.log(data);
      var html =template("tpl",data);
      $("tbody").html(html);
  
  
  //分页导航功能
  $("#paginator").bootstrapPaginator({
    bootstrapMajorVersion:3,//默认是2 , 如果是bootstrap 3 就是必须写的
    currentPage:currentPage,
    totalPages:Math.ceil(data.total/pageSize),
    size:"small",
    onPageClicked:function(event, originalEvent, type,page){
      //为按钮绑定点击事件 page:当前点击的按钮值
      currentPage = page;
      render();
            }
         });
     }
  });
  }
  render();
  
  //点击btn 弹出模态框
  //给tbody绑定委托事件
  $("tbody").on("click",".btn",function () {
    //是模态框显示
    $("#userModal").modal("show");
    //改变数据 拿到id值  判断isDelete
    var id= $(this).parent().data("id");
    var isDelete = $(this).parent().data("isDelete");
    console.log(isDelete);
    isDelete = isDelete === 1 ? 0 : 1;
    //点击btn按钮 可以进行切换  解除绑定事件
    $('.btn_confirm').off().on("click",function () {
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (data) {
          console.log(data);
          //拿到数据关掉模态框
          if(data.success){
            //关闭模态框
            $("#userModal").modal("hide");
            render();
          }
        }
      });
    });
    
  });
})
