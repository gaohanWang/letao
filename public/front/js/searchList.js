/**
 * Created by lenovo on 2017/11/3.
 */

//声明一个data的所有传的数据
var data = {
  proName:"",
  brandId:"",
  price:"",
  num:"",
  page:1,
  pageSize:10
};
//发送ajax请求数据  拿到后台数据渲染商品
function render() {
  
$.ajax({
  type:"get",
  url:"/product/queryProduct",
  data:data,

  success:function (data) {
    // console.log(data);
    setTimeout(function () {
      $(".lt_product").html(template("tpl",data));
    },1000)
   
  }
});
}

var key = tools.getParam("key");
$(".search_text").val(key);
data.proName = key;
render(data);

//点击搜索按钮 再次渲染网页
$(".search_btn").on("click",function () {
  // console.log("hh");
  // 清掉所有now样式,和箭头指向
  $(".lt_sort a").removeClass("now");
  $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
  data.price = "";
  data.num = "";
  
  //获取用户输入的内容
  var  key = $(".search_text").val().trim();//拿到输入的值,并且两边没有空格
  if(key === ""){
    mui-alert("请输入搜索内容","温馨提示");
  }
  $(".lt_product").html('<div class="loading"></div>');
  data.proName = key ;
  render(data);
});

//排序功能
$(".lt_sort>a[data-type]").on("click",function () {
  // console.log("hh");
  //当a标签有now的时候 切换箭头
  //当a没有now的时候,给a加上now ,并且把其他兄弟的now取消
  var $this = $(this);
  var $span = $this.find("span");
  if($this.hasClass("now")){
    $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }else {
    //a没有now
    $(this).addClass("now").siblings().removeClass("now");
    $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
  }
  //判断是哪个排序
  var type = $this.data("type");
  var value = $span.hasClass("fa-angle-down")?2:1;
  
  //设置num值 和price 的值
  data[type] = value;
  render(data);
})




