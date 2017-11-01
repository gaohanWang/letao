/**
 * Created by lenovo on 2017/10/31.
 */
$(function () {
 //1.渲染一级功能
  var currentpage = 1;
  var pageSize = 5;
  function render() {
      $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
          page:currentpage,
          pageSize:pageSize
        },
        success:function (data) {
          console.log(data);
          $("tbody").html(template("tpl",data));
          //分页的插件
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:currentpage,
            totalPages:Math.ceil(data.total/pageSize),
            size:"small",
            onPageClicked(a,b,c,page){
              currentpage = page,
                render();
            }
          })
        }
      })
  }
  render();
  
  //添加功能

    //点击按钮添加模态框
    $(".btn_add").on("click",function () {
      // console.log('hehe');
      $("#addModal").modal("show");
    });
  
  //给表单做校验
  var $form = $("#form");
  $form.bootstrapValidator({
    //校验时使用的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      //name属性
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类名称不能为空"
          }
        }
      }
      
    }
  });
  
  $form.on("success.form.bv",function (e) {
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function (data) {
        console.log(data);
        if(data.success){
          //关闭模态框
          $("#addModal").modal("hide");
          //2. 重新渲染第一页
          currentPage = 1;
          render();
  
          // 重置表单
          $form.data("bootstrapValidator").resetForm();
          //表单有一个reset方法，会把表单中所有的值都清空,js对象的方法
          $form[0].reset();
        }
      }
    });
  })
  
})