/**
 * Created by lenovo on 2017/11/1.
 */
 var sc =  mui(".mui-scroll-wrapper").scroll({
  indicators : false,
});

//渲染一级分类
$.ajax({
  type:"get",
  url:"/category/queryTopCategory",
  success:function (data) {
    // console.log(data);
    var html = template("tpl",data);
    $('.lt_category_l ul').html(html);
  //
    renderSecond(data.rows[0].id);
  }
  
})

//封装一个方法  获取  二级分类并渲染
function renderSecond(id) {
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      success:function (data) {
        // console.log(data);
        $(".lt_category_r").html(template("tpl2",data));
      }
    })
}


//渲染第二个分类  获取li的id 自定义属性  给li绑定委托事件
$(".lt_category_l").on("click","li",function () {
  $(this).addClass("now").siblings().removeClass("now");
  var id = $(this).data("id");
  renderSecond(id);
  
})