/**
 * Created by lenovo on 2017/11/1.
 */
//用localStorage 记录输入的数据  记录的是json对象
//1.把字符串转换成数组
//2.使用模板引擎渲染数据
function getHistory() {
  var search_history = localStorage.getItem("lt_search_history") || "[]";
  var arr = JSON.parse(search_history);
  return arr;
}

function render() {
  var arr = getHistory();
  //模版第二个参数：必须是对象，因为在模版中是直接通过对象的属性来获取。
  $(".lt_history").html(template("tpl", {arr: arr}));
}
render();

//点击清除历史记录,然后清除下面生成的localStorage的数据
//删除后在渲染页面  (委托事件)
$(".lt_history").on("click",".icon_empty",function () {
  localStorage.removeItem("lt_search_history");
  render();
});


//点击删除每个小xx 删除那一条的数据
//删除前找到那个a标签的data-index 的下标
//获取缓存中的数据,在数组中找到那个相应的index 的值,然后删除那个数据
//把这个数据重新返回到这个数组中
//重新渲染页面
$(".lt_history").on("click",".mui-icon-closeempty",function () {
  // console.log("heheh");
  
  
    var arr = getHistory();//获取localStorage的面的值
    var index = $(this).data("index");//拿到数组下标
    arr.splice(index,1);//删除下标那一个元素
    localStorage.setItem("lt_search_history",JSON.stringify(arr));//数组转成json
    render();
  
});


//获取text的值
$(".secarch_btn").on("click",function () {
  var key = $(".search_text").val().trim();
  
  if(key === ""){
    mui-alert("亲你想买啥","温馨提示");
    return;
  }
  //把text的值放到localstorage里面存起来
  var arr = getHistory();
  //如果里面有就删除,再添加,如果没有直接添加在前面unshift()
  var index = arr.indexOf(key);//没有就返回-1  有就返回数组里面的下标
  if(index >-1){
    //有
    arr.splice(index, 1);
  }
  
  if(arr.length >=10){
    arr.pop();//在前面删除元素  push()后面添加
  }
  //存储keyde 值
  arr.unshift(key);//在后面删除那个值 shift()添加
  
  //添加到localstory 里面
  localStorage.setItem("lt_search_history",JSON.stringify(arr));//数组转成json数据
  //页面跳转
  location.href = "searchList.html?key="+key;
  
  
})



