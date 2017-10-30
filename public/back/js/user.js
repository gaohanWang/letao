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
      var html =template("tel",data);
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
})
