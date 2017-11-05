/**
 * Created by lenovo on 2017/11/4.
 */
$(function () {
  
  // //下拉刷新功能
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",
      down : {
        auto: true,
        callback :function () {
  
          //渲染购物车功能
          $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function (data) {
              console.log(data);
              //获取数据花了1秒钟
              setTimeout(function () {
                console.log(data);
                tools.checkLogin(data);
                //渲染购物车
                $("#OA_task_2").html( template("tpl", {data:data}) );
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              }, 1000);
      
            }
          });


        }
      }
    }
  });
  
  //点击删除按钮删除该行的数据,然后刷新重新渲染  click时间被刷新时不能点击  有bug所以用  tap  来触发事件
  $("#OA_task_2").on("tap", ".btn_delete", function () {
    var id = $(this).data("id");//获取自定义属性
    //弹出确认框
    mui.confirm("确定删除吗?","提示",["否","是"],function (e) {
      if(e.index === 0){
        mui.toast("操作取消");
      }else {
        $.ajax({
          type:"get",
          url:"/cart/deleteCart",
          data:{
            id:[id]//id必须是一个数组
          },
          success:function (data) {
            tools.checkLogin(data);//判断是否登录
            if(data.success){
              //让容器下拉一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  });

//编辑功能,  里面需要拿到信息  用data 来获取值
  
  $("#OA_task_2").on("tap",".btn_edit",function (e) {
  
    console.log(11);
    //拿到所有的自定义属性
    var  data = this.dataset;
    
    //模板引擎绑定数据
    var  html = template("tpl2",data);
    // console.log(html);
    //去掉HTML  span里的所有自带样式/n
    html = html.replace(/\n/g,"");
    console.log(html);
    
    //弹出confirm 框
    mui.confirm(html,"编辑商品",["确定","取消"],function (e) {
      if(e.index == 0 ){
        // 修改里面的值
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:data.id,
            size:$(".lt_edit_size span.now").html(),
            num:$(".mui-numbox-input").val()
          },
          success:function (data) {
            //校验是否登录
            tools.checkLogin(data);
            if(data.success){
              //成功后刷新页面  从新下拉刷新
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading()
            }
          }
        });
      }else{
        mui.toast("取消操作");
      }
    });
    //重新渲染
    mui(".mui-numbox").numbox();//让加减 num 重新渲染一遍
    $(".lt_edit_size span").on("tap",function () {
      console.log(11);
      $(this).addClass("now").siblings().removeClass("now");
    })
    
    
  })


  //1. 需要给所有的checkbox注册事件
  $("#OA_task_2").on("change", ".ck", function () {
    //获取到选中的checkbox，计算选中checkbox的商品的金额
    
    var total = 0;
    
    $(":checked").each(function (i, e) {
      
      total +=  $(this).data("num") * $(this).data("price");
      
      
    });
    
    $(".lt_total span").html(total);
  });
  
  
  
  
  
  
  
})

